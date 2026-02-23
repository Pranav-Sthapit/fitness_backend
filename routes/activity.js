import express from 'express'

const router=express.Router();

const childern=async(req,res)=>{
    const {cardio,muscle,bone}=req.body;

    const data={
        cardio:Number(cardio),
        muscle:Number(muscle),
        bone:Number(bone)
    }

    const activity_level=((data.cardio*60/100)+(data.muscle*15/100)+(data.bone*25/100))/2;

    return res.send({message:"Your activity level is "+activity_level.toFixed(1)});
}

const adult=async(req,res)=>{

    const {cardioType,cardio,muscle}=req.body;
    
    
    const data={
        cardio:Number(cardio),
        muscle:Number(muscle)
    }

    if(cardioType=="vigorous"){
        
        data.cardio=Math.min(data.cardio*2,10);
        
    }

    const activity_level=((data.cardio*60/100)+(data.muscle*40/100))/2;

    return res.send({message:"Your activity level is "+activity_level.toFixed(1)});
}

const senior=async(req,res)=>{
    const {cardioType,cardio,muscle,balance}=req.body;

    const data={
        cardio:Number(cardio),
        muscle:Number(muscle),
        balance:Number(balance)
    }

    if(cardioType=="vigorous"){
        data.cardio=Math.min(data.cardio*2,10);
    }

    const activity_level=((data.cardio*60/100)+(data.muscle*25/100)+(data.balance*15/100))/2;

    return res.send({message:"Your activity level is "+activity_level.toFixed(1)});
}

router.post("/children_activity",childern);
router.post("/adult_activity",adult);
router.post("/senior_activity",senior);
export default router;