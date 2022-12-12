import userModel from "../models/user.js";
import adminModel  from "../models/admin.js";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";


class adminController{
static adminsignup = async(req,res)=>{
    const isAdmin = await adminModel.findOne()
    console.log(isAdmin);
    if(isAdmin== null){
            const{email,password} = req.body
        console.log(email, password);
        if(email && password){
            if(password){
                const salt = await bcrypt.genSalt(12)
                const hashPassword= await bcrypt.hash(password,salt)
                try {
                    const doc = new adminModel({                  
                        email:email,
                        password:hashPassword
                    })
                    await doc.save()
                    const saved_user = await adminModel.findOne({email:email})
                    const token = jwt.sign({user_ID:saved_user._id},process.env.JWT_SECRATE_KEY,{expiresIn:'5d'})
                    res.send({
                            status:"sucess",
                            message:"You are registered successfully",
                            token:token
                    })                     
                } catch (error) {
                    res.send({
                        status:"failed",
                        message:"Unable to sign Up"
                    })    
                }
            }else{
                res.send({
                    status:"failed",
                    message:"password And Confirm Password Doesn't match"
                })
            }    
        }
    }else{
        res.send({
            status:"failed",
            message:"admin allready present"
        })
    }
}
    static adminlogin = async (req,res)=>{
            try {
                const {email,password} = req.body
                if(email && password){
                    const user = await adminModel.findOne({ email:email})
                    // console.log(user._id);
                    if (user != null){
                        const isMatch = await bcrypt.compare(password,user.password)
                        if(user.email === email && isMatch){
                            const token = jwt.sign({user_ID:user._id}, process.env.JWT_SECRATE_KEY,{expiresIn:'5d'})
                            res.send({
                                status:"sucess",
                                message:"Login successfully",
                                token:token
                            })
                        }else{
                            res.send({
                                status:"failed",
                                message:"email or password doesn't exist either wrong"
                            })
                        }
                    }else{
                        res.send({
                            status:"failed",
                            message:"user doesn't exist"
                        })
                    }
                }
            } catch (error) {
                res.send({
                    status:"failed",
                    message:"Unable to login"
                })   
            }
        } 
        static getAllDoc = async (req,res)=>{
            const data = await userModel.find()
            res.send({
                status:"Success",
                message:data

            })
    
    }
}


export default adminController