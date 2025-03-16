import express from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import path from 'path'
const PORT = process.env.PORT
import {app,server} from './lib/socket.js'
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

import cookieParser from 'cookie-parser';
const __dirname = path.resolve()
app.use(cookieParser()); 
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

import messageroutes from './routes/message.route.js'
 import authroutes from "./routes/auth.route.js";
import {
     connectDb } from './lib/db.js';

app.use("/api/auth",authroutes)
app.use("/api/messages",messageroutes)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist","dist","index.html"))
    })
}

server.listen(PORT,()=>{
    console.log('server is running on port '+ PORT)
    connectDb()
})