const ULID = require("ulid");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const NotFound = require("../errors/NotFound");
const { format } = require("date-fns");

// -------------------- ALL EXPENSES ...done
async function getExpenses(owner) {
  let userExpense = await Expense.find({
    owner: owner,
  });

  // .sort({
  //   date: -1, //to get the newest first
  // });

  if (userExpense.length === 0) {
    throw new NotFound("No expense found for this user.");
  }

  return userExpense;
}

// -------------------- ONE EXPENSE...done
async function getExpense(req) {
  const result = await Expense.findOne({
    owner: req.owner,
    _id: req.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  return result;
}

// -------------------- CREATE EXPENSE...done
async function createExpense(data, identifier) {
  const newExpense = new Expense(data);

  newExpense.save();

  const result = await User.findByIdAndUpdate(
    identifier,
    { $push: { expenses: newExpense._id } },
    { new: true, upsert: true }
  )
    .then((user) => {
      return user;
    })
    .catch((error) => {
      return error;
    });

  return { message: "Expense created successfully" };

  // const newExpense = await Expense.create({
  //   id: ULID.ulid(),
  //   owner: data.owner,
  //   date: data.date,
  //   title: data.title,
  //   description: data.description,
  //   amount: data.amount,
  //   currency: data.currency,
  //   category: data.category,
  //   members: data.members,
  //   expenseType: data.expenseType,

  // }
  // );

  // return newExpense;
}

// -------------------- UPDATE EXPENSE...done
async function updateExpense(params, body) {
  const result = await Expense.findOne({
    owner: params.owner,
    _id: params.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  const expenseUpdate = await Expense.updateOne(
    {
      owner: params.owner,
      _id: params.id,
    },
    {
      $set: body,
    }
  );

  return { message: "Expense updated successfully" };
}

// -------------------- DELETE EXPENSE ...done
async function deleteExpense(params) {
  const result = await Expense.findOne({
    owner: params.owner,
    _id: params.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  const deleteExpense = await Expense.deleteOne({
    owner: params.owner,
    _id: params.id,
  });

  return { message: "Expense deleted successfully" };
}

// --------------------

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
