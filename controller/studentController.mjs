import jwt from "jsonwebtoken";
import { getDecryptPassword, getEncryptPassword } from "../helper/helper.js";
import { inviteMail } from "../helper/mail.js";
import studentModel from "../model/studentModel.js";

export const addStudent = async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      grade,
      email,
      city,
      primaryC,
      secondaryC,
      password,
    } = req.body;
    const stdObject = {
      name,
      age,
      gender,
      grade,
      email,
      city,
      contact: {
        primary: primaryC,
        secondary: secondaryC,
      },
      password,
    };
    const student = studentModel(stdObject);
    student.password = getEncryptPassword(student.password);

    const studentAdded = await student.save();
    // const studentAdded = await studentModel.create(stdObject);
    console.log({
      message: "Student added Successfully",
      email: studentAdded.email,
    });
    inviteMail(studentAdded.name, studentAdded.email);
    res.status(201).json({
      message: "Student added Successfully",
      email: studentAdded.email,
    });
  } catch (err) {
    next(err);
  }
};

// studentModel.findOneAndUpdate({email},{student},{new:true})

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await studentModel.find({ email });
    if (!user[0]) {
      return res.status(403).send("Invalid Email");
    } else {
      const isMatch =
        getEncryptPassword(password) === (await user[0].password)
          ? true
          : false;
      if (!isMatch) return res.status(403).send("Incorrect Password");
      else {
        let token = jwt.sign(
          { id: user[0].id },
          process.env.REACT_APP_JWT_PRIVATE_KEY,
          { expiresIn: "1h", algorithm: "HS256" }
        );
        console.log({ message: "login successful", token: token });
        res.status(200).send({ message: "login successful", token: token });
      }
    }
  } catch (err) {
    next(err);
  }
};
