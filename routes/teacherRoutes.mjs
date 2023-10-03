// const express = require('express');
import express from 'express';
import { registerTeacher, logInTeacher, getAllTeachers } from '../controller/teacherController.mjs'
import { auth } from '../service/authService.mjs';
// const { auth } = require('../services/authService');

let router=express.Router();

router.post("/addteacher", registerTeacher)
router.post("/loginteacher", logInTeacher)
router.get("/getteachers", auth, getAllTeachers)

export default router;