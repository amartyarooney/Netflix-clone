import {User} from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
export async  function signup(req,res) {
    try{
        // console.log("request: " + req);
        const {email,password,username} = req.body;
        // console.log(req.body);
        if(!email || !password || !username){
            
            return res.status(400).json({success: false, message:"all fields are required"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!emailRegex.test(email)){
            console.log("here?");
            return res.status(400).json({success:false, message:"user invalid"});
        }
        const exisitingEmailByUser = await User.findOne({email:email});

        if(exisitingEmailByUser){
            return res.status(400).json({success:false, message: "user already exists"});
        }


        const exisitingEmailByUsername = await User.findOne({username:username});
        if(exisitingEmailByUsername){
            return res.status(400).json({success:false, message: "username already exists"});
        }
        if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
		}
    
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
        email:email,
        username:username,
        password:hashPassword
    });
    generateTokenAndSetCookie(newUser._id, res);
    console.log("hereew");
    await newUser.save();  
    
    res.status(201).json({sucess: true, user:{
        ...newUser._doc,
        password: "",
         },
    });
    }catch(error){
        console.log("error in signup", error.message)
        res.status(500).json({success:false,message: "Internal server error"});
        
    }
}

export async function login(req,res){
    try{
        const {email, password} = req.body;
        console.log(req.body);
        if(!email || !password){
            return res.status(400).json({success:false, message:"all fields are required"});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false, message:"invalid user or password"});
        }
        console.log(user.password+" and  "+ password);
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(404).json({success:false, message:"invalid user or password"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({sucess: true, user:{
            ...user._doc,
            password: "",
             },
        });
    }catch(error){
        console.log("error in login "+error);
    }
}

export async function logout(req,res){
    try{    
        res.clearCookie("jwt-netflix");
        res.status(200).json({success: true, message: "logged out successfully!"})

    }catch(error){
        console.log("error in logout controller", error.message);
        res.status(500).json({success: false, message:"internal server error"})
    }
}


export async function authCheck(req,res){
    try {
            res.status(200).json({success:true, user:req.user});
    } catch (error) {
        console.log("error in authcheck");
        res.status(500).json({success:false, message: error});
    }
}