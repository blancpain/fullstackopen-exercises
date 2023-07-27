import patientsData from "../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

let patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...atribs }) => atribs);
};

const findById = (id: string): NonSensitivePatient | null => {
  const patient = patients
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ ssn, ...atribs }) => atribs)
    .find((patient) => patient.id === id);

  if (patient) return patient;

  return null;
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

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const newId: string = uuid();
  const newEntry = {
    id: newId,
    ...entry,
  };

  const selectedPatient = findById(id);

  if (selectedPatient) {
    const updatedEntries = selectedPatient.entries.concat(newEntry);
    patients = patients.map((patient) => {
      return patient.id === selectedPatient?.id
        ? { ...patient, entries: updatedEntries }
        : patient;
    });
  }

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
