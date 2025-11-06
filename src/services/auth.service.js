"use strict";

const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { USER_ROLE } = require("../constants/role");
const { createTokenPair } = require("../utils/authUtils");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../utils");

class AuthService {
  static signUp = async ({name, email, password}) => {
    try {
      //check shop is exists
      const user = await userModel.findOne({email}).lean(); 
      if (user) {
        return {
          code: 400,
          status: "error",
          message: "User already exists", 
        };
      }
      //hash password
      const hashedPassword = await bcrypt.hashSync(password, 10);
      //create user
      const newUser = await userModel.create({name, email, password: hashedPassword, roles: [USER_ROLE.SHOP]});
      if (newUser) {
        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await KeyTokenService.createKeyToken({userId: newUser._id, publicKey, privateKey});
        if (!keyStore) {
          return {
            code: 400,
            status: "error",
            message: "Generate key pair failed",
          };
        }
        const tokens = await createTokenPair({userId: newUser._id, email}, publicKey, privateKey);

        return {
          code: 201,
          status: "success",
          metadata: {
            user: getInfoData({fields: ["_id", "name", "email"], object: newUser}),
            token: tokens,
          },
        };
      }
    } catch (error) {
      return {
        code: 500,
        status: "error",
        message: error.message,
      };
    }
  };
}

module.exports = AuthService;