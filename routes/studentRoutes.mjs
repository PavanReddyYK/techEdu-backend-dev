import express from 'express';
import { addStudent, signIn } from '../controller/studentController.mjs';
// const express = require('express');
const router = express.Router()

// const { addStudent, signIn } = require('../controller/studentController');


router.post('/addStudent',addStudent)
router.post('/signIn',signIn)

// module.exports= router
export default  router;