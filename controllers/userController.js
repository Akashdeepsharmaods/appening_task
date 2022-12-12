import userModel from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";


class userController {
    static userSignUp = async(req,res)=>{
        const {name, email, phone, password,confirm_password,user_name,tc} = req.body
        const user = await userModel.findOne({email:email})
        if(user != null){
            res.send({
                status:"false",
                message:" user already exist"
            })
        }else{
            if(name && password && confirm_password && phone && user_name && email && tc){
        
                if(password === confirm_password){
                    const salt = await bcrypt.genSalt(12)
                    const hashPassword= await bcrypt.hash(password,salt)

                try {
                    const doc = new userModel({
                        name:name,
                        email:email,
                        phone:phone,
                        password:hashPassword,
                        user_name:user_name,
                        tc:tc
                    })
                    await doc.save()
                    const saved_user = await userModel.findOne({email:email})
                    const token = jwt.sign({user_ID:saved_user._id},process.env.JWT_SECRATE_KEY,{expiresIn:'5d'})
                    res.send({
                            status:"sucess",
                            message:"You are registered successfully",
                            token:token
                    })                    
                } catch (error) {
                    res.send({
                        status:"failed",
                        message:"unable to register please try again later"
                    })                    
                }
                }else{
                    res.send({
                        status:"failed",
                        message:"password && confirm Password Doesn't match"
                    })
                }
            }else{
                res.send({
                    status:"failed",
                    message:"all fields are required"
                })
            }
        }        
    }
    static userlogIn = async (req,res)=>{
        try {
            const {email,password} = req.body
            if(email && password){
                const user = await userModel.findOne({ email:email})
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
    static Change_Password = async (req,res)=>{
        const {password,confirm_password} = req.body
        // console.log(password,confirm_password);
        if (password && confirm_password){
            if (password !== confirm_password){
                res.send({
                    status:"failed",
                    message:"password and confirm Password doesn't match"
                })
            }else{
                const salt= await bcrypt.genSalt(12)
                const newHashPassword = await bcrypt.hash(password,salt)
                console.log(req.user);
                await userModel.findByIdAndUpdate(req.user_ID,{$set:{password:newHashPassword}})
                res.send({
                    status:"Sucess",
                    message:"Password change Successfully"
                }) 
            }
        }else{
            res.send({
                status:"failed",
                message:"All fields are required"
            })
        }
    }
}
export default userController