import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import cook from './routes/cook.js'

dotenv.config()
const app=express()
const port=process.env.port || 8000

mongoose.set('strictQuery',false)
const connect=()=>{
    try{
         mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("DB connected")
    }
    catch(err)
    {
        console.log("DB connection failed",err)
    }
}

app.get("/",(req,res)=>{
    res.send("Api is working")
    res.send('welcome to a simple HTTP cookie server')
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/tours",tourRoute)
app.use("/users",userRoute)
app.use("/auth",authRoute)
app.use("/cookies",cook)

app.listen(port,()=>{
    connect()
    console.log('Server listening',port)
})