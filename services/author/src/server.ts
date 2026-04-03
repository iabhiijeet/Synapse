import express from 'express'
import dotenv from 'dotenv'
const app = express()

app.listen(3000,()=>{
  console.log("App listening on 3000!");
})