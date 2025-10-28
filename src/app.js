const express = require("express");
const app = express();
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");

//init middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

//init database

//init routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello World",
  });
});

//handling errors

module.exports = app;