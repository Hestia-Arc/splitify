// const ULID = require("ulid");
const jwt = require("jsonwebtoken");
const { addSeconds, getTime, format, formatISO } = require("date-fns");
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
      "A user with the provided email address exists"
    );
  }

  let hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
    friends: [],
    expenses: [],
  });

  const result = {
    id: newUser._id,
    email: newUser.email,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
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
      id: user._id,
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
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
    jwt: {
      token: token,
    },
  };
}

// ====================== HISTORY  ....done
async function userHistory(request) {
  // console.log(request.user);

  // const user = await User.findOne({ id: request.user })
  //   .populate("expenses")
  //   .then((userP) => {
  //     // console.log("Populated User" + expenses);
  //     return userP;
  //   });

  const user = await User.findByIdAndUpdate(request.user)
    .populate("expenses").populate("friends")
    .then((userData) => {
      console.log("Populated User");
      return userData;
    });


  if (user === null) {
    throw new AuthenticationError("User credentials do not match our records");
  }

  return {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    friends: user.friends,
    expenses: user.expenses,
    createdAt: user.createdAt,
    updatedAt:user.updatedAt
  };

}
``
module.exports = {
  registerUser,
  login,
  userHistory,
};
