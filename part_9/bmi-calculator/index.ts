import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
import { parseQuery, parseJSONRequest } from "./utils";

app.use(express.json());

app.get("/hello", (req, res) => {
  const { height, weight } = req.query;

  if (
    height &&
    weight &&
    typeof height === "string" &&
    typeof weight === "string"
  ) {
    try {
      const { a, b } = parseQuery([height, weight]);
      const bmi = calculateBmi(a, b);
      res.json({ weight, height, bmi });
    } catch (e) {
      let errorMessage = "Something went wrong.";
      if (e instanceof Error) {
        errorMessage += " Error: " + e.message;
      }
      res.status(400).json({ error: errorMessage });
    }
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercise", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises && target) {
    try {
      const { target: convertedTarget, userInputs } = parseJSONRequest({
        daily_exercises,
        target,
      });

      const output = exerciseCalculator(convertedTarget, userInputs);
      res.json(output);
    } catch (e) {
      let errorMessage = "Something went wrong.";
      if (e instanceof Error) {
        errorMessage += " Error: " + e.message;
      }
      res.status(400).json({ error: errorMessage });
    }
  } else {
    res.status(400).json({ error: "parameters missing" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
