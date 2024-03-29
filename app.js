require('dotenv').config()
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const routes = require("./routes/index");
// var usersRouter = require('./routes/users'); //Won't be used
const getGroups = require("./routes/groups");
// require("dotenv").config({ debug: process.env.DEBUG }); //dotenv debugger
const EdgeGrid = require("edgegrid");
const app = express();


//EdgeGrid Variable for akamai secrets
let eg = new EdgeGrid({ 
  path: __dirname + '/.edgerc', group: "papi" });

// view engine setup 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set('eg', eg); //allows access to eg globally even when not defined

//Individual routes are defined here:
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter); //Won't be used
app.use("/", routes);
app.use("/groups/", getGroups);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;