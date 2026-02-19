//const express = require('express') usig module type 
import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"

const app = express();

const __dirname = path.resolve();


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


app.listen(ENV.PORT, ()=> {
    console.log("Server is running from port:", ENV.PORT)
})
