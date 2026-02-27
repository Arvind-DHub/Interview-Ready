import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try{
        // use clerId or stream (not mongodb _id)=> it should match the id we have in stream dashboard
        const token =chatClient.createToken(req.user.clerkId)

        res.status(200).json({
            token,
            userId: req.user.ClerkId,
            userName: req.user.name,
            userImage: req.user.image
        })
    }catch(error){
        console.log("Error in getStreamToken controller",error.message);

        res.status(500).json({
            message:"Internal Server Error"
        });
    }
}