"use strict";

const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");
const { asyncHandler } = require("../../auth/checkAuth");

router.post("/shop/register", asyncHandler(authController.signUp));

module.exports = router;