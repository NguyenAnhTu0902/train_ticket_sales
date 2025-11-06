"use strict";

const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");

router.post("/shop/register", authController.signUp);

module.exports = router;