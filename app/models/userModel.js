const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Friends",
    },
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
