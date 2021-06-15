import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (Number(height) && Number(weight)) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight,
      height,
      bmi,
    });
  } else {
    res.json({
      error: "malformatted parameters",
    });
  }
});

function isNumberArray(value: unknown): value is number[] {
  if (!Array.isArray(value)) {
    return false;
  }
  if (value.some((v) => typeof v !== "number")) {
    return false;
  }
  return true;
}
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  const calculatedJSON = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!body.daily_exercises || !body.target) {
      return {
        error: "parameters missing",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!isNumberArray(body.daily_exercises) || !isNumber(body.target)) {
      return {
        error: "malformatted parameters",
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return calculateExercises(body.daily_exercises, body.target);
  };
  res.json(calculatedJSON);
});
const PORT = 3002;

app.listen(PORT, () => {
  console.log("server running at ", PORT);
});
