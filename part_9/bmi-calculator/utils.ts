const isNumber = (arg: unknown): boolean => !isNaN(Number(arg));

export const parseTwoArgs = (args: string[]): { a: number; b: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      a: Number(args[2]),
      b: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const parseMultipleArgs = (args: string[]): ValidOutput => {
  if (args.length < 3) throw new Error("Not enough arguments");

  const target = args[2];
  const userInputs = args.slice(3);
  const allAreNumbers = userInputs.every(isNumber);

  if (!allAreNumbers || !isNumber(target)) {
    throw new Error("Some of the provided values were not numbers");
  }

  return {
    target: Number(target),
    userInputs: [...userInputs.map((arg) => Number(arg))],
  };
};

export const parseQuery = (args: string[]): { a: number; b: number } => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");

  if (isNumber(args[0]) && isNumber(args[1])) {
    return {
      a: Number(args[0]),
      b: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface ValidOutput {
  target: number;
  userInputs: number[];
}

export const parseJSONRequest = (arg: {
  daily_exercises: number[];
  target: number;
}): ValidOutput => {
  const target = arg.target;
  const userInputs = arg.daily_exercises;
  const allAreNumbers = userInputs.every(isNumber);

  if (!allAreNumbers || !isNumber(target)) {
    throw new Error("Some of the provided values were not numbers");
  }

  return {
    target: Number(target),
    userInputs: [...userInputs.map((arg) => Number(arg))],
  };
};
