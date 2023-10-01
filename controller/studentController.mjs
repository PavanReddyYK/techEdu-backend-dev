import studentModel from "../model/studentModel.js";

export const addStudent = async (req, res,next) => {
  try {
    const { id, name, age, gender, grade, email, city, primaryC, secondaryC } =
      req.body;
    const stdObject = {
      // id,
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
    };
    // console.log(stdObject);
    const student = studentModel(stdObject);
    const studentAdded = await student.save();
    // studentModel.create(stdObject);
    console.log(studentAdded._id)
    res.status(201).json({ message: "Student added Successfully",username:student.name });
  } catch(err) {
    next(err)
  }
};

// studentModel.findOneAndUpdate({email},{student},{new:true})


export const signIn=()=>{
    console.log("me");
}