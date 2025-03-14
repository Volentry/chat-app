import cloudinary from "../lib/cloudinary_pic.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
export const signup =async (req,res)=>{
 
    const {fullName,email,password} = req.body
    try {
        if(!email || !fullName || !password){
            return res.status(400).json({
                message:"all field required"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                message:"password too short"
            })
        }
       
        const user = await User.findOne({email})
        if(user) {return res.status(400).json({
            message:"email already exists"
        })}

        const salt  = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })
        console.log(newUser)
        if (newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            
            res.status(201).json({
                email:newUser.email,
                fullName:newUser.fullName,
                id:newUser._id,
                profilePic:newUser.profilePic
            })
        }else{
            return res.status(400).json({
            message:"failed to createee a account "
        })}


        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"failed to create a account ",
            error:error
        })
    }
}
export const login = async (req,res)=>{
    console.log(req.body)
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Incorrect Credentials"
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Incorrect Credentials"
            })
        }
      generateToken(user._id,res)
        res.status(201).json({
            email:user.email,
            fullName:user.fullName,
            id:user._id,
            profilePic:user.profilePic
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}
export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"Logout Successfull"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}
export const updateProfile = async(req,res)=>{
   
   try{
    const {profilePic} = req.body 
    const userId = req.user._id 
    if(!profilePic){
        return res.status(400).json({
            message:"no profile pic provided"
        })
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{
        new:true
    })
    return res.status(200).json(updatedUser)

   }catch(error){
    return res.status(500).json({
        message:"server error"
    })

   }
}
export const checkAuth = (req,res)=>{
    try {
       return  res.status(200).json(req.user)
    } catch (error) {
       return  res.status(500).json({message:"internal server error"})
        
    }
}