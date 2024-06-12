const ULID = require("ulid");
const jwt = require("jsonwebtoken");
const { addSeconds, getTime, format, formatISO } = require('date-fns');
const { hashPassword, compareHash } = require("../utilities/hash");
const { generateKeys } = require("../utilities/keygenerator");
const User = require("../models/userModel");
const ResourceExists = require("../errors/ResourceExisits");
const AuthenticationError = require("../errors/AuthenticationError");

// ================ SAVE USER ...done
async function registerUser(userData) {
  const { fullname, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ResourceExists(
      "A user with the provided username or email address exists"
    );
  }

  const today = new Date();

  let hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    id: ULID.ulid(),
    fullname,
    email,
    password: hashedPassword,
    friends: [],
    expenses: [],
  });

  const result = {
    id: newUser.id,
    email: newUser.email,
  };

  return result;
}

// =================== LOGIN USER
async function login(email, password) {
  const user = await User.findOne({ email });

  if (user === null) {
    throw new AuthenticationError("User credentials do not match our records");
  }

  const passwordCompare = await compareHash(password, user.password);

  if (passwordCompare === false) {
    throw new AuthenticationError("User credentials do not match our records");
  }


  const token = jwt.sign(
    {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
    `${process.env.API_KEY}`,
    {
      expiresIn: 360000,
    }
  );

  return {
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
    jwt: {
      token: token,
    },
  };
}






// ====================== HISTORY  ....done
async function userHistory(req) {
  const user = await User.findOne({ id: req }).populate("expenses");

  if (user === null) {
    throw new AuthenticationError("User credentials do not match our records");
  }

  return {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    friends: user.friends,
    expenses: user.expenses,
  };
}

module.exports = {
  registerUser,
  login,
  userHistory,
};
