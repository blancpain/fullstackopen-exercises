import patientsData from "../data/patients";
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...atribs }) => atribs);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newId: string = uuid();
  const newEntry = {
    id: newId,
    ...entry,
  };

  patients.push(newEntry);
  return newEntry;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
