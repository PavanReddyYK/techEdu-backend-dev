// const { invitaionMail, sendOtp } = require('../helpers/mailHelper');
import { inviteMail, sendOtp } from "../helper/mail.mjs";

// const { createOtp } = require('../helpers/otpHelper');
import { createOtp } from "../helper/helper.mjs";

// const User = require("../models/user.model");
import User from "../model/userModel.mjs";

// const bcryptjs = require("bcryptjs");
import bcryptjs from "bcryptjs";

// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    let { fullname, email, role } = req.body;
    let isUserAvailable = await User.findOne({ email });
    if (isUserAvailable) {
      return res
        .status(500)
        .json({ error: true, message: "User Already Exists" });
    }
    let user = await User.create({ fullname, email, role });
    inviteMail(fullname, email);
    return res
      .status(201)
      .json({ error: false, message: "User Added Successfully", data: user });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let { email } = req.body;
    let isUserAvailable = await User.findOne({ email });

    if (!isUserAvailable) {
      return res.status(500).json({
        error: true,
        message: `User Not Found with given email ${email}`,
      });
    }

    let { hashedotp, otp } = await createOtp();
    console.log(hashedotp, otp);
    let user = await User.findOneAndUpdate(
      { email },
      { hashedotp },
      { new: true, runValidators: true }
    );

    sendOtp(email, otp, user.fullname);

    return res
      .status(201)
      .json({ error: false, message: "OTP sent Successfully to your email" });
  } catch (err) {
    next(err);
  }
};

export const userVerification = async (req, res, next) => {
  try {
    let { email, otp } = req.body;
    let isUserAvailable = await User.findOne({ email });
    if (!isUserAvailable) {
      return res.status(500).json({
        error: true,
        message: `User Not Found with given email ${email}`,
      });
    }
    let isTrue =  bcryptjs.compare(otp, isUserAvailable.hashedotp);

    if (isTrue) {
      let token = jwt.sign(
        {
          email: isUserAvailable.email,
          name: isUserAvailable.fullname,
        },
        process.env.REACT_APP_JWT_PRIVATE_KEY,
        { expiresIn: process.env.REACT_APP_JWT_EXPIRESIN }
      );
      return res
        .status(201)
        .json({ error: false, message: "Login Successfull", token });
      // return res.status(200).json({error:false,message:"OTP Verified Successfully"})
    }
    return res
      .status(500)
      .json({ error: true, message: "OTP Verification Failed!!!!" });
  } catch (err) {
    next(err);
  }
};
