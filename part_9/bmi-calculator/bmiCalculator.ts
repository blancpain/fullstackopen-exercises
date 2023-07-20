// import { parseTwoArgs } from "./utils";

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi <= 18.4) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight";
  }
};

// try {
//   const { a, b } = parseTwoArgs(process.argv);
//   console.log(calculateBmi(a, b));
// } catch (e: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (e instanceof Error) {
//     errorMessage += " Error: " + e.message;
//   }
//   console.log(errorMessage);
// }
