"use strict";

const mongoose = require("mongoose");
const os = require("os");
const INTERVAL = 5000; // 5 seconds

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections: ${numConnection}`);
};

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    // Example maximum number of connections based on the number of cores
    const maxConnections = numCores * 5;
    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory usage: ${Math.round(memoryUsage / 1024 / 1024)} MB`);
    console.log(`Number of cores: ${numCores}`);
    console.log(`Max connections: ${maxConnections}`);

    if (numConnection > maxConnections) {
      console.log("Connection overload detected");
      //notify.send(...)
    }
  }, INTERVAL);
};

module.exports = {  
  countConnect,
  checkOverload,
};