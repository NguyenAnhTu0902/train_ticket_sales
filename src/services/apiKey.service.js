"use strict";

const ApiKeyModel = require("../models/apiKey.model");
// const crypto = require("crypto");

class ApiKeyService {
  static findById = async (key) => {
    // const newKey = await ApiKeyModel.create({
    //   key: crypto.randomBytes(64).toString("hex"),
    //   permissions: ["0000"],
    // });
    // console.log("newKey::", newKey);
    
    const apiKey = await ApiKeyModel.findOne({key, status: true}).lean();
    return apiKey;
  };
}

module.exports = ApiKeyService;