import express from "express";
import mongodb from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mainRoutes from "./mainRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1",mainRoutes);

app.listen(process.env.PORT,()=>{
    console.log("app is listening at ",process.env.PORT)
})

app.get("*",(req,res)=>{
    res.send("running...")
})


