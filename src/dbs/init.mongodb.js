"use strict";

const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const { db : { host, port, name }} = require("../configs/config.db");

const connectString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

class Database {
  constructor() {
    this.connect();
  }
  //connect to database
  connect() {
    if (process.env.NODE_ENV !== "dev") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose.connect(connectString)
      .then(() => {
        countConnect();
      })
      .catch((err) => console.log("Error connecting to MongoDB", err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
      console.log("Connect success");
    }
    return Database.instance;
  }

}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;