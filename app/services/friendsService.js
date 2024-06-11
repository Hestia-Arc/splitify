// const ULID = require("ulid");
const Expense = require("../models/expenseModel");
const NotFound = require("../errors/NotFound");
const { format } = require("date-fns");

// -------------------- ALL FRIENDS
async function getFriends(owner) {
  let userExpense = await Expense.find({
    owner: owner,
  });

  // .sort({
  //   date: -1, //to get the newest first
  // });

  if (userExpense.length === 0) {
    let err = new Error("No expense present for the user");
    err.status = 400;
    throw err;
  }
  return userExpense;
}

// -------------------- ONE FRIEND...
async function getFriend(req) {
  const result = await Expense.findOne({
    owner: req.owner,
    _id: req.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  return result;
}

// -------------------- CREATE FRIEND...
async function createFriend(expData) {
  // const today = new Date();

  const newExpense = await Expense.create(expData);

  return newExpense;
}

// -------------------- UPDATE FRIEND
async function updateFriend(params, body) {
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

  return { msg: "Expense updated successfully" };
}

// -------------------- DELETE FRIEND
async function deleteFriend(params) {
  const result = await Expense.findOne({
    owner: params.owner,
    _id: params.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  var deleteExpense = await Expense.deleteOne({
    owner: params.owner,
    _id: params.id,
  });

  return { msg: "Expense deleted successfully" };
}

// --------------------

module.exports = {
  getFriends,
  getFriend,
  createFriend,
  updateFriend,
  deleteFriend,
};
