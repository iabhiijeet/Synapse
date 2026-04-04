import type { AuthenticatedRequest } from "../middleware/isAuth.js";
import { type Response, type Request} from "express";
import TryCatch from "../utils/tryCatch.js";
import getBuffer from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import {sql} from "../utils/db.js";
import blog from "../routes/blog.js";

interface IBlog {
  id: string;
  title: string;
  description: string;
  blog_content: string;
  category: string;
  author: string;
  image: string;
}

export const createBlog = TryCatch(async(req:AuthenticatedRequest, res:Response)=>{
  const {title, description, blog_content,category} = req.body;
  const file = req.file;

  if(!file){
    return res.status(400).json({message:"Image is required"});
  }
  const fileBuffer = getBuffer(file);
  if(!fileBuffer||!fileBuffer.content){
    return res.json({"message":"Failed to generate Buffer!"});
  }
  const cloud= await cloudinary.v2.uploader.upload(fileBuffer.content,{
    folder:"blogs"
  })

  const result = await sql`
  INSERT INTO blogs (title, description, blog_content, image, category, author) VALUES (${title},${description},${blog_content},${cloud.secure_url},${category},${req.user?._id}) RETURNING *`
  console.log(result);

  return res.status(201).json({"message":"Blog created successfully!", result});
});


export const updateBlogs = TryCatch(async(req:AuthenticatedRequest, res:Response)=>{
  const {id} = req.params;
  const {title, description, blog_content, category}=req.body;
  const file = req.file;
  const blogs = await sql `SELECT * FROM blogs WHERE id = ${id}`;
  const existingBlog = blogs[0];

  if (!existingBlog) {
    return res.status(404).json({ message: "No blog with this id" });
  }

  if (existingBlog.author !== req.user?._id) {
    return res.status(401).json({ message: "You are not the author of this blog" });
  }
  if(!file){
    return res.status(400).json({message:"Image is required"});
  }
  const fileBuffer = getBuffer(file);
  if(!fileBuffer||!fileBuffer.content){
    return res.json({"message":"Failed to generate Buffer!"});
  }
  const cloud= await cloudinary.v2.uploader.upload(fileBuffer.content,{
    folder:"blogs"
  })
  const imageUrl = cloud.secure_url || existingBlog.image;

  const updatedBlog = await sql`UPDATE blogs SET
    title = ${title || existingBlog.title},
    description = ${description || existingBlog.description},
    image= ${imageUrl},
    blog_content = ${blog_content || existingBlog.blog_content},
    category = ${category || existingBlog.category}

    WHERE id = ${id}
    RETURNING *
    `;
    res.status(201).json({"message":"Blog updated successfully!", updatedBlog});
  console.log(updatedBlog);

})

export const deleteBlog = TryCatch(async(req:AuthenticatedRequest,res:Response)=>{
  const {id}= req.params;
  const blogs = await sql `SELECT * FROM blogs WHERE id = ${id}`;
  const selectedBlog = blogs[0];
  if(!selectedBlog){
    return res.status(400).json({"message":"Blog can't be deleted!"});
  }
  if(req.user?._id!=selectedBlog.author){
    return res.status(400).json({"message":"You are not allowed to delete this blog!"});
  }
  await sql`DELETE FROM saved_blogs WHERE blog_id=${id}`
  await sql`DELETE FROM comments WHERE blog_id=${id}`
  await sql`DELETE FROM blogs WHERE id = ${id}`;
  return res.status(200).json({"message":"Blog deleted successfully!"});
})