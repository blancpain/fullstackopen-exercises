import { NonSensitiveDiaryEntry } from "./types";

export const isDiaryEntry = (
  param: object
): param is NonSensitiveDiaryEntry => {
  return (param as NonSensitiveDiaryEntry).date !== undefined;
};
