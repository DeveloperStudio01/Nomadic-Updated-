import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//User Registration
export const register=async(req,res)=>{
    try{
        //Hashing Passwords
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)
        const newUser=new User({
            username:req.body.username,
            phone:req.body.phone,
            password:hash,
        })
        await newUser.save()
        res.status(200).json({success:true,message:"Created Successfully"})
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Failed to create"})
    }
}

//User Login
export const login=async(req,res)=>{
    const phone=req.body.phone
    try
    {
        const user=await User.findOne({phone})
        //If User dont exists
        if(!User)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        //Comparing and checking password 
        const checkCorrectPassword=await bcrypt.compare(req.body.password,user.password)
        if(!checkCorrectPassword)
        {
            return res.status(401).json({success:false,message:"Incorrect phone number or password"})
        }
        const {password,role,...rest}=user._doc
        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:"15d"}
        )
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,message:"Successful Login",data:{...rest},})
    }
    catch(err)
    {
        res.status(500).json({success:false,message:"Failed to login"})
    }
}