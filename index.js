import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import predictionRoute from "./routes/predict.js";
import nutritionRoute from "./routes/nutrition.js";
import activityRoute from "./routes/activity.js";
import signingRoute from "./routes/signing.js";
import { pool } from './config/db.js';

const app=express();

const PORT=8000;

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to brawl hallaasasddasd");
})

app.use("/",predictionRoute);
app.use("/",nutritionRoute);
app.use("/",activityRoute);
app.use("/",signingRoute);

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});