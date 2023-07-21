import data from "../data/diagnoses";
import { Diagnose } from "../types";

const getEntries = (): Diagnose[] => {
  return data;
};

const addDiagnose = () => {
  return null;
};

export default { getEntries, addDiagnose };
