import express from 'express'
import dotenv from 'dotenv'
const app = express()
import connectDB from './utils/db.js'
import userRoutes from './routes/user.js'
app.use(express.json())
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME as string, 
        api_key: process.env.CLOUDINARY_API_KEY as string, 
        api_secret:  process.env.CLOUDINARY_SECRET as string
})


connectDB();

app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`User service is running on port ${PORT}`);
})