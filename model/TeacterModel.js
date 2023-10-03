import { Schema,model } from "mongoose";
import bcryptjs from 'bcryptjs'

let teacherSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email is Mandatory"]
    },
    password:{
        type:String,
        required:[true,"Password is Mandatory"]
    }
},{timestamps:true})

teacherSchema.pre("save",async function(next)
{
    let salt=await bcryptjs.genSalt(11);
    this.password=await bcryptjs.hash(this.password,salt);
})

teacherSchema.methods.compareMyPassword = async function(password)
{
    let hashedPassword=await bcryptjs.compare(password,this.password);
    return hashedPassword;
}


export default new model("teacher",teacherSchema)