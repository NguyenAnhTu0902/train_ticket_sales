"use strict";

const ApiKeyService = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        code: "FORBIDDEN",
        message: "Forbidden Error",
      });
    }
    const apiKey = await ApiKeyService.findById(key);
    if (!apiKey) {
      return res.status(403).json({
        code: "FORBIDDEN",
        message: "Forbidden Error",
      });
    }
    req.apiKey = apiKey;
    return next();
  }
  catch (error) {
    return res.status(403).json({
      code: "FORBIDDEN",
      message: error.message,
    });
  }
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.apiKey.permissions) {
      return res.status(403).json({
        code: "FORBIDDEN",
        message: "Forbidden Error",
      });
    }
    console.log("permission::", permission);

    const validPermission = req.apiKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        code: "FORBIDDEN",
        message: "Forbidden Error",
      });
    }
    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};


module.exports = {  apiKey, permission, asyncHandler };