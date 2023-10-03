// const { invitaionMail } = require("../helpers/mailHelper");
import { inviteMail } from '../helper/mail.mjs';

// const Teacher = require("../models/teacher.model");
import Teacher from '../model/TeacterModel.js'

import jwt from 'jsonwebtoken'
// const jwt = require("jsonwebtoken");

import dotenv from 'dotenv';
dotenv.config()
// require("dotenv").config();

export let registerTeacher = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    //? returns the document if condition satisfies else return null
    let isTeacherAvailable = await Teacher.findOne({ email });

    if (!isTeacherAvailable) {
      //! Email Code
      inviteMail(name,email);
      //! Email Code
      let teacher = await Teacher.create({ name, email, password });

      return res
        .status(201)
        .json({
          error: false,
          message: "Teacher Added Successfully",
          data: { name: teacher.name, email: teacher.email },
        });
    }
    res.status(409).json({ error: true, message: "Teacher Already Exist" });
  } catch (err) {
    next(err);
  }
};

export let logInTeacher = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let isTeacherAvailable = await Teacher.findOne({ email });

    if (!isTeacherAvailable) {
      return res
        .status(404)
        .json({ error: true, message: "No Teacher Found with Given Mail Id" });
    }

    let hashedPassword = await isTeacherAvailable.compareMyPassword(password);

    if (hashedPassword) {
      let token = jwt.sign(
        { email: isTeacherAvailable.email, name: isTeacherAvailable.name },
        process.env.REACT_APP_JWT_PRIVATE_KEY,
        { expiresIn: process.env.REACT_APP_JWT_EXPIRESIN }
      );

      return res
        .status(201)
        .json({ error: false, message: "Login Successfull", token });
    } else {
      return res.status(401).json({ error: true, message: "Invalid Password" });
    }
  } catch (err) {
    next(err);
  }
};

export let getAllTeachers = async (req, res, next) => {
  try {
    let teachers = await Teacher.find({}, { _id: 0 });
    // console.log("🚀 ~ file: teacherController.mjs:76 ~ getAllTeachers ~ teachers:", teachers)

    return res
      .status(200)
      .json({
        error: false,
        message: "Teachers Fetched Successfully",
        user: req.user.name,
        data: teachers,
      });
  } catch (err) {
    next(err);
  }
};
