const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const database = require("./routes/database");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Add the public folder as static for serving files
app.use(express.static(path.join(__dirname, "public")));

app.use("/todo", indexRouter);
app.use("/todo/users", usersRouter);
app.use("/todo/database", database);

module.exports = app;
