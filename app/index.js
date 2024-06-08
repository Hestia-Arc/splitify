const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const rotatingFileStream = require("../config/logger");
require("dotenv").config();
require("../config/database");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const app = express();

app.use(logger("combined", { stream: rotatingFileStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);


module.exports = app;
