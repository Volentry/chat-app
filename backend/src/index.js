import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

import cookieParser from 'cookie-parser';

app.use(cookieParser()); 
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

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