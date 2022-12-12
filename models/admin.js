import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    email:{type:String,trim:true},
    password:{type:String,trim:true}
})
const adminModel = mongoose.model("adminData",adminSchema)

export default adminModel