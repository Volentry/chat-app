import express from 'express' 
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
const app = express();
app.use(express.json())
 import authroutes from "./routes/auth.route.js";
import { connectDb } from './lib/db.js';
app.use("/api/auth",authroutes)

app.listen(PORT,()=>{
    console.log('server is running on port '+ PORT)
    connectDb()
})