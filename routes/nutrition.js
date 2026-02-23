import express from "express";

const router = express.Router();

router.post("/calculate_nutrition", (req, res) => {
  const {
    fruitsVeggies,
    carbs,
    proteins,
    fats,
    sugar,
    salt,
    calcium,
    junk,
    water,
  } = req.body;

  const data = {
    fruitsVeggies: Number(fruitsVeggies),
    carbs: Number(carbs),
    proteins: Number(proteins),
    fats: Number(fats),
    sugar: Number(sugar),
    salt: Number(salt),
    calcium: Number(calcium),
    junk: Number(junk),
    water: Number(water),
  };

  let nutritionLevel =(
    (data.fruitsVeggies * 18 / 100) +
    (data.carbs * 8 / 100) +
    (data.proteins * 13 / 100) +
    (data.fats * 8 / 100) +
    (data.sugar * 15 / 100) +
    (data.salt* 10 / 100) +
    (data.calcium * 5 / 100) +
    (data.junk * 15 / 100) +
    (data.water * 8 / 100) 
    ).toFixed(2);

  res.send({ message: "Your nutrition level is "+nutritionLevel});
});

export default router;
