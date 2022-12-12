import Jwt from "jsonwebtoken";
import userModel from "../models/user.js";


var checkUserAuth = async(req,res,next)=>{
    let token

    const{authorization}= req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            token= authorization.split(' ')[1]
            const {userID} = Jwt.verify(token,process.env.JWT_SECRATE_KEY)
            req.user = await userModel.findById(userID).select('-password')
            next()

        } catch (error) {
            res.status(401).send({
                status:"failed",
                message:"Unauthorized User"               
            })
        }
    }
    if(!token){
        res.status(401).send({
            status:"failed",
            message:"Unauthorised User , No Token"
        })
    }
}
export default checkUserAuth