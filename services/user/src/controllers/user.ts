import  type { Request, Response } from "express";
import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import TryCatch from "../utils/tryCatch.js";
import type { AuthenticatedRequest } from "../middleware/isAuth.js";

export const loginUser = async (req:Request, res:Response)=>{
  try {
    const {email,name, image} = req.body;
    if(!email||!name){
      return res.status(400).json({message: "Email and name are required"});
    }
    let user = await User.findOne({email});
    if(!user){
      user = await User.create({
        email, name, image
      })
    }
    const token = jwt.sign({user},process.env.JWT_SECRET as string, {expiresIn:"7d"});
    return res.status(200).json({message: "User logged in successfully", user, token});
  } catch (error) {
    return res.status(500).json({message: "Internal server error"});
  }
}

export const getMe = TryCatch(async(req:AuthenticatedRequest,res:Response)=>{
  const user = req.user;
  res.json({user});

})

export const getUserProfile = TryCatch(async(req:AuthenticatedRequest,res:Response)=>{
  const user = await User.findById(req.params.id);
  if(!user){
    return res.status(401).json({message: "User not found"});
  }
  res.json({user});
})

export const updateUserProfile = TryCatch(async(req:AuthenticatedRequest,res:Response)=>{
  const {name, instagram,facebook,twitter,linkdIn,github,bio} = req.body;
  const user = await User.findByIdAndUpdate(
    req.user?._id,{
      name, instagram,facebook,twitter,linkdIn,github,bio
    },
    {new:true}
  )
  const token = jwt.sign({user},process.env.JWT_SECRET as string, {expiresIn:"7d"});
  res.status(200).json({'message':"User updated!", user, token})
}
)

