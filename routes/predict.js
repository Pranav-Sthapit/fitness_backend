import express from "express";
import {pool} from "../config/db.js"
import axios from "axios";


const router = express.Router();



router.post("/prediction/:id", async (req, res) => {

  const data=req.body;
  
  const userId=Number(req.params.id);
  const activity = data.activity;
  const age = data.age;
  const bloodPressure = data.bloodPressure;
  const gender = data.gender;
  const heartRate = data.heartRate;
  const height = data.height;
  const nutrition = data.nutrition;
  const sleepHours = data.sleepHours;
  const smoke = data.smoke;
  const weight = data.weight;
  let fitness,recommendation;

  //send all of above to the flask prediction and get recommendation and fitness probability
  try{
    const FLASK_URL=process.env.FLASK_URL;    
    const result=await axios.post(`${FLASK_URL}/prediction_and_recommendation`,{activity,age,bloodPressure,gender,heartRate,height,nutrition,sleepHours,smoke,weight});
    console.log(result.data);
    fitness=result.data.fitness;
    recommendation=result.data.recommendation;
  }catch(err){
    console.error("error occured while sending data to flask",err);
  }
  //end

  if(!fitness || !recommendation){
    console.log("prediction failed")
    return;
  }

  const query =
    "INSERT INTO predictions(age,height,weight,gender," +
    "heart_rate,blood_pressure,sleep_hours,smokes,nutrition," +
    "activity,fit_predicted,recommendation,user_id) VALUES" +
    "($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";

  const smokesBoolean = smoke == "Yes" ? true : false;

  const values = [
    Number(age),
    Number(height),
    Number(weight),
    gender,
    Number(heartRate),
    Number(bloodPressure),
    Number(sleepHours),
    smokesBoolean,
    Number(nutrition),
    Number(activity),
    fitness,
    JSON.stringify(recommendation),
    userId
  ];

  try{
    const result=await pool.query(query,values);
    if(result){
        console.log(`Prediction is ${fitness} and recommendation is`,recommendation);
    }
  }catch(err){
    console.error(err);
  }

  res.send({fitness,recommendation});
});

export default router;
