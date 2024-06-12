// const ULID = require("ulid");
const Expense = require("../models/expenseModel");
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
    let err = new Error("No expense present for the user");
    err.status = 400;
    throw err;
  }
  return userExpense;
}

// -------------------- ONE EXPENSE...done
async function getExpense(req) {
  const result = await Expense.findOne({
    owner: req.owner,
    id: req.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  return result;
}

// -------------------- CREATE EXPENSE...done
async function createExpense(expData) {
  // const today = new Date();

  const newExpense = await Expense.create(expData);

  return newExpense;
}

// -------------------- UPDATE EXPENSE...done
async function updateExpense(params, body) {
  const result = await Expense.findOne({
    owner: params.owner,
    id: params.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

  const expenseUpdate = await Expense.updateOne(
    {
      owner: params.owner,
      id: params.id,
    },
    {
      $set: body,
    }
  );

  return { msg: "Expense updated successfully" };
}

// -------------------- DELETE EXPENSE ...done
async function deleteExpense(params) {
  const result = await Expense.findOne({
    owner: params.owner,
    id: params.id,
  });

  if (result === null) {
    throw new NotFound("Expense not found.");
  }

const deleteExpense = await Expense.deleteOne({
    owner: params.owner,
    id: params.id,
  });

  return { msg: "Expense deleted successfully" };
}

// --------------------

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
