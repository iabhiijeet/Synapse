import  type { Request, Response } from "express";
import User from '../model/User.js'
import jwt from 'jsonwebtoken'

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