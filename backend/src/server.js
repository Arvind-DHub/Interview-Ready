import dns from 'dns';
// Set DNS servers before any network code 
dns.setServers(['8.8.8.8', '1.1.1.1']);
//solves ECONNREFUSED error due to change in the c-ares library the DNS fallback detection bug in Node
//const express = require('express') usig module type 
import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express";
import { inngest, functions } from './lib/inngest.js';

const app = express();

const __dirname = path.resolve();

app.use(express.json())
//credentials:true meaning?? => server allows browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

app.use("/api/inngest", serve({client:inngest, functions}));

app.get("/health", (req, res) => {
    res.status(200).json({msg:"api is up and running"})
})

app.get("/books", (req, res) => {
    res.status(200).json({msg:"books api"})
})

//make our app ready for deployment
if(ENV.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    })
}


const startServer = async() => {
    try{
        await connectDB();
        app.listen(ENV.PORT, "0.0.0.0", ()=> {
        console.log("👌 Server is running from port:", ENV.PORT); })
    }catch(error){
        console.error("💥 Error Starting the server ",error);
    }
}

startServer();