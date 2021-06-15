interface calculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseHours: number[],
  target: number
): calculateExercisesResult => {
  const totalHours = exerciseHours.reduce((a, b) => a + b, 0);
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((a) => a != 0).length;
  const average = totalHours / periodLength;
  const success = average >= target;
  const metric = average / target;
  const rating = (): number => {
    if (metric > 1 && metric < 2) return 2;
    if (metric < 1) return 1;
    if (metric > 2) return 3;
    return 0;
  };
  const calculatedRating = rating();

  const ratingDescription = (): string => {
    if (calculatedRating === 1) return "you can do better";
    if (calculatedRating === 2) return "you met your target, good job";
    if (calculatedRating === 3) return "you have overdone yourself, super!";
    return "something went wrong";
  };
  const calculatedDescription = ratingDescription();

  return {
    periodLength,
    trainingDays,
    success,
    rating: calculatedRating,
    ratingDescription: calculatedDescription,
    target,
    average,
  };
};
console.log(process.argv);
const args = process.argv.slice(2).map((a) => Number(a));
if (args[0] && args[1]) {
  console.log(calculateExercises(args.slice(1), Number(args[0])));
} else {
  console.log("missing or malformatted parameters");
}
