import cloudinary from "../lib/cloudinary_pic.js"
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({
            message:"error occured while fetching users"
        })
    }
}

export const getMessages = async (req,res)=>{
     try {
        const {id:usertoChatId} = req.params
        const senderId = req.user._id 
        const messages = await Message.find({
            $or:[
                {senderId:senderId,receiverId:usertoChatId},
                {senderId:usertoChatId,receiverId:senderId}
            ]
        })

        res.status(200).json(messages)

     } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })        
     }
}

export const sendMessage = async (req,res)=>{
    try {
        const {text,image} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id 
        let imageUrl 
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl =  uploadResponse.secure_url

        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)
    } catch (error) {

        res.status(500).json({
            message:"internal server error"
        })
        
    }
}