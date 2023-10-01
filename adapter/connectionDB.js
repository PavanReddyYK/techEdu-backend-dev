import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.REACT_APP_Dev_DB_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log("Error connecting Db");
    console.error(error);
  });
