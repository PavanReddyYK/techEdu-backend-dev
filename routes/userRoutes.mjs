import express from "express";
import { createUser, loginUser, userVerification } from "../controller/userController.mjs";

let router=express.Router()

router.post("/adduser",createUser)
router.post("/loginuser",loginUser)
router.post("/userverification",userVerification)


export default router;