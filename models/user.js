import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    phone:{type:Number,required:true,trim:true,minlength:10,maxlenght:10},
    password:{type:String,required:true,trim:true},
    user_name:{type:String,required:true,trim:true},
    tc:{type:Boolean,required:true}    
})
const userModel =mongoose.model("data",userSchema)

export default userModel