export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100.0) * (height / 100.0));
  if (bmi < 18.5) return "Underweight";
  if (bmi > 18.5 && bmi < 25) return "Normal (healthy weight)";
  if (bmi > 25 && bmi < 30) return "Overweight";
  if (bmi > 30) return "Obese";
  return "something went wrong";
};

const bmiArgs = process.argv.slice(2).map((a) => Number(a));
if (bmiArgs[0] && bmiArgs[1]) {
  console.log(calculateBmi(bmiArgs[0], bmiArgs[1]));
} else {
  console.log("missing or malformatted parameters");
}
