// import { parseMultipleArgs } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const exerciseCalculator = (target: number, input: number[]): Result => {
  const periodLength = input.length;
  const trainingDays = input.filter((a) => a !== 0).length;
  const average = input.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let ratingDescription;
  let rating;

  if (success) {
    ratingDescription = "You met your target!";
    rating = 1;
  } else if (average / target >= 0.75) {
    ratingDescription = "Not too bad but could be better";
    rating = 2;
  } else {
    ratingDescription = "You are well below your target. Try harder!";
    rating = 3;
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

// try {
//   const { target, userInputs } = parseMultipleArgs(process.argv);
//   console.log(exerciseCalculator(target, userInputs));
// } catch (err: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (err instanceof Error) {
//     errorMessage += " Error: " + err.message;
//   }
//   console.log(errorMessage);
// }
