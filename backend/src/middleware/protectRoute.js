import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

//when you call an array of middleware to express, it automatically flattens and executes them sequentially, one by one 
export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try{
            const clerkId =req.auth().userId;
            if(!clerId) return res.status(401).json({msg: "Unauthorized - invalid token"})
            
            // find user in db by clerk ID
            const user = await User.findOne({clerkId});
            if(!user) return res.status(404).json({msg:"User not found"})
            
            //attach user to user
            req.user = user;

            next();

        }catch(error){
            console.error("Error in protectRoute middleware",error);
            res.status(500).json({message:"Internal Server Error"})
        }
    }
]