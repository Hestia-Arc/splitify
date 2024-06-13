const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rotatingFileStream = require("../config/logger");
require("dotenv").config();
require("../config/database");

const authRouter = require("./routes/auth");
const expensesRouter = require("./routes/expenses");
const friendsRouter = require("./routes/friends");

const app = express();

app.use(logger("combined", { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", expensesRouter);
app.use("/", friendsRouter);


module.exports = app;
