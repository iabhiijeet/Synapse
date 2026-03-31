import express from 'express'
import dotenv from 'dotenv'
const app = express()
import connectDB from './utils/db.js'
import userRoutes from './routes/user.js'
app.use(express.json())

dotenv.config();
connectDB();

app.use('/api/v1/users', userRoutes);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`User service is running on port ${port}`);
})