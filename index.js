import express from 'express';
import connectDB from './DB/connection.js';
import userModel from './DB/models/user.model.js';
import initApp from './index.router.js';
import dotenv from 'dotenv'
dotenv.config();
const app=express();
const PORT=process.env.PORT;
initApp(app,express);
connectDB();

app.post('/',async(req,res)=>{
    const user=await userModel.find({})
    return res.json({message:"users", user})
})

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING on port ${PORT}`); 
})