// const ULID = require("ulid");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");
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
    fullname,
    email,
    password: hashedPassword,
    friends: [],
    expenses: []
  });

  const result = {
    id: newUser._id,
    email: newUser.email,
  };

  //   // CREATE AND SEND TOKEN
  // const token = await JWT.sign(
  //     { email: newUser.email },
  //     process.env.JWT_SECRET ,
  //     {
  //       expiresIn: 360000,
  //     }
  //   );

  //   // SEND THE TOKEN
  //   res.json({
  //     errors: [],
  //     data: {
  //       token,
  //       user: {
  //         id: newUser._id,
  //         email: newUser.email,
  //       },
  //     },
  // msg: "Registration successful",
  //   });
  //   --------------------------------

  // const result = await collection.insertOne({
  //     id: ULID.ulid(),
  //     first_name: userData.first_name,
  //     last_name: userData.last_name,
  //     username: userData.username,
  //     email: userData.email,
  //     password: password,
  //     created_at: format(today, 'yyyy-MM-dd'),
  // });

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
      email: user?.email,
      
    },
    process.env.APP_KEY,
    { expiresIn: 60 * 30, issuer: process.env.JWT_ISSUER }
  );

  return {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    // created_at: user.created_at,
    token: token,
  };
}

// ====================== HISTORY  ....done
async function userHistory(req) {
  const user = await User.findOne({ _id: req }).populate("expenses");

  if (user === null) {
    throw new AuthenticationError("User credentials do not match our records");
  }

  return {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    friends: user.friends,
    expenses: user.expenses
  };
}

module.exports = {
  registerUser,
  login,
  userHistory
};
