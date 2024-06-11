// const ULID = require("ulid");
const Expenses = "../models/expenseModel";
const NotFound = require("../errors/NotFound");
const { format } = require("date-fns");


// -------------------- ALL EXPENSES
async function getExpenses() {

    let userExpense = await Expenses.find({
        owner: req.body.user
    }).sort({
        date: -1 //to get the newest first 
    })


    if (userExpense.length === 0) {
        let err = new Error("No expense present for the user")
        err.status = 400
        throw err
    }
  return await collection.find({}).toArray();
}

// -------------------- ONE EXPENSE
async function getExpense(identifier) {
  const collection = await database.connect("posts");

  const result = await collection.findOne({ id: identifier });

  if (result === null) {
    throw new NotFound("Post not found.");
  }

  return result;
}


// -------------------- CREATE EXPENSE
async function createExpense(postData) {
  const collection = await database.connect("posts");

  const today = new Date();

  const result = await collection.insertOne({
    // id: ULID.ulid(),
    title: postData.title,
    // slug: sluggify(postData.title),
    author: postData.author,
    body: postData.body,
    is_featured: postData.is_featured ?? false,
    created_at: format(today, "yyyy-MM-dd"),
    category: postData.category ?? "Uncategorized",
  });

  return result;
}

// -------------------- UPDATE EXPENSE


// -------------------- DELETE EXPENSE


// -------------------- 

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
};
