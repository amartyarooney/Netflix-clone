import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";


export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies["jwt-netflix"];
        if(!token){
            return res.status(404).json({success: false, message: "token unauthorised"});
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if(!decoded){
            return res.status(404).json({success: false, message: "token wrong"});
        }

        const user =  await  User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({success: false, message: "user not found"});
        }
        req.user = user;
        next();
    }catch(error){
        console.log("error in protect middleware"+ error.message);
        res.status(404).json({success: false, message: "Internal Server Error"});
    }
}