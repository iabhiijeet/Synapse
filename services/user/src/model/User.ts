import mongoose from 'mongoose'
import { Document, Schema } from 'mongoose';
export interface IUser extends Document {
  name:string;
  email:string;
  image:string;
  instagram:string;
  twitter:string;
  linkdIn:string;
  facebook:string;
  github:string;
  bio:string;
}

const schema:Schema<IUser> = new Schema<IUser>({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  image:{
    type:String,
    required:true
  },
  instagram:{
    type:String,
  },
  facebook: String,
  twitter: String,
  linkdIn: String,
  github: String,
  bio: String

},{
  timestamps:true
})

const User = mongoose.model<IUser>('User',schema);
export default User;