import express from 'express' 
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
import cookieParser from 'cookie-parser';

app.use(cookieParser()); 
import messageroutes from './routes/message.route.js'
 import authroutes from "./routes/auth.route.js";
import {
     connectDb } from './lib/db.js';
app.use("/api/auth",authroutes)
app.use("/api/message",messageroutes)

app.listen(PORT,()=>{
    console.log('server is running on port '+ PORT)
    connectDb()
})