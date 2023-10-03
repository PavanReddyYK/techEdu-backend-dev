// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// require('dotenv').config()

export let auth = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;
    console.log(
      "🚀 ~ file: authService.mjs:10 ~ auth ~ Bearer Token:",
      authToken
    );

    if (!authToken || !authToken.startsWith("Bearer")) {
      return res.status(500).json({ error: true, message: "Token Required" });
    }
    let token = authToken.split(" ")[1];

    let decodedData = jwt.verify(token, process.env.REACT_APP_JWT_PRIVATE_KEY);
    let { email, name } = decodedData;

    req.user = { email, name };
    next();
  } catch (err) {
    next(err);
  }
};
