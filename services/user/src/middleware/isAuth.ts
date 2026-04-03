import {type Request, type Response, type NextFunction, request } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { IUser } from "../model/User.js";

export interface AuthenticatedRequest extends Request {
  user?:IUser|null;
}

export const isAuth = (req:AuthenticatedRequest, res:Response, next:NextFunction)=>{
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer')){
      res.status(404).json({'message':"No token found! Please Login."});
      return;
    }
    const token = authHeader.split(" ")[1];
    if(!token){
      res.status(401).json({'message':"Invalid Token!"});
      return;
    }
    const decodedVal = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if(!decodedVal||!decodedVal.user){
      res.status(401).json({'message':"Invalid Token!"});
      return;
    }
    req.user=decodedVal.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({'message':"Jwt verification failed!"});
    return;
  }
}