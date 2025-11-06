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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init database
require("./dbs/init.mongodb");
require("./helpers/check.connect").checkOverload();

//init routes
app.use("", require("./routes"));
//handling errors

module.exports = app;