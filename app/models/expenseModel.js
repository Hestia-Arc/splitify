const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "NGN",
  },
  category: {
    type: String,
    default: "Others",
  },
  members: {
    type: Array,
    required: true,
  },
  expenseType: {
    type: String,
    default: "Cash",
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
