import { Schema,model } from "mongoose";

const contactSchema = new Schema({
    primary : {
        type:String,
        required : true
    },
    secondary : {
        type : String
    }
})

const studentSchema = new Schema({
    name: {
        type : String,
        required : true,
        minLength : [4,"name should be minimum of 4 characters"],
        maxLength : [15,"name should not exceed 15 characters"],
        required : true
    },
    age:{
        type:Number,
        required:[true,'age is mandatory'],
        min:[8,"age cannot be below 8 years"],
        max:[22,"age cannot be above 8 years"]
    },
    gender : {
        type :String ,
        enum : {
            values : ['male', 'female'],
            message :"gender can only male or female"
        }
    },
    grade :{
        type : Number,
        // default : "A",
    },
    email: {
        type: String,
        unique : true
    },
    city :{
        type:String,
    },
    contact: {
        type : contactSchema
    }
})

 const studentModel = model('student',studentSchema)
 export default studentModel
