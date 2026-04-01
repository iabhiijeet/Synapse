import express from 'express'
import dotenv from 'dotenv'
const app = express()
import connectDB from './utils/db.js'
import userRoutes from './routes/user.js'
app.use(express.json())

dotenv.config();
connectDB();

app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`User service is running on port ${PORT}`);
})