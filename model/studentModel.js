import { Schema,model } from "mongoose";
// import bcryptjs from 'bcryptjs'

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
        max:[22,"age cannot be above 22 years"]
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
        enum : {
            values : [11,12],
            message :"grade can only be 11 or 12"
        }
    },
    email: {
        type: String,
        unique : true,
        required : true
    },
    city :{
        type:String,
    },
    contact: {
        type : contactSchema
    },
    password : {
        type : String,
        minLength: [4,"password should be minimum of 4 characters"],
        required : true,
    }
})


const studentModel = model('student',studentSchema)
export default studentModel


// studentSchema.pre('save', async function(next){
//     try{
//         const salt = await bcryptjs.genSalt(12)
//         const encryptedPassword = await bcryptjs.hash(this.password,salt)
//         this.password= encryptedPassword
//     }
//     catch(error){
//         next(error)
//     }
// })