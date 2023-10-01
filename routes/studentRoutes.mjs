import express from 'express';
import { addStudent, signIn } from '../controller/studentController.mjs';
const router = express.Router()

router.post('/addStudent',addStudent)
router.post('/signIn',signIn)

export default  router;