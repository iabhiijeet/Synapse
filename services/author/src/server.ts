import express from 'express'
import dotenv from 'dotenv'
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
import { initDB } from './utils/model.js'
import { v2 as cloudinary } from 'cloudinary';
import blogRoutes from './routes/blog.js';

dotenv.config();
const port = process.env.PORT 

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME as string, 
        api_key: process.env.CLOUDINARY_API_KEY as string, 
        api_secret:  process.env.CLOUDINARY_SECRET as string
})
initDB().then(()=>{
   app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})

app.use('/api/v1/blog', blogRoutes);
