import {
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  Entry,
  HealthCheckRating,
  Diagnose,
  SickLeave,
  Discharge,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (input: unknown): input is number => {
  return typeof input === "number";
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (input: string): input is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(input);
};

const isHealthCheckRating = (input: number): input is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((g) => g)
    .includes(input);
};

const isSickLeave = (input: unknown): input is SickLeave => {
  if (!input || typeof input !== "object") {
    throw new Error("Incorrect or missing entries data");
  }

  return (
    (input as SickLeave).endDate === "string" ||
    typeof (input as SickLeave).startDate === "string"
  );
};

const isDischarge = (input: unknown): input is Discharge => {
  if (!input || typeof input !== "object") {
    throw new Error("Incorrect or missing entries data");
  }

  return (
    (input as Discharge).criteria === "string" ||
    typeof (input as Discharge).date === "string"
  );
};

const entryHasValidType = (input: Entry) => {
  return (
    input.type === "HealthCheck" ||
    input.type === "Hospital" ||
    input.type === "OccupationalHealthcare"
  );
};

const areEntries = (input: unknown): input is Entry[] => {
  if (!input || !Array.isArray(input)) {
    throw new Error("Incorrect or missing entries data");
  }

  return (input as Entry[]).every(entryHasValidType);
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!areEntries(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  return entries;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !isSickLeave(sickLeave) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error("Incorrect or missing sick leave");
  }
  return sickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !isDischarge(discharge) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect or missing discharge");
  }
  return discharge;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return rating;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name");
  } else {
    return name;
  }
};

const parseEmployerName = (employer: unknown): string => {
  if (!isString(employer)) {
    throw new Error("Incorrect employer");
  } else {
    return employer;
  }
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn");
  } else {
    return ssn;
  }
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation");
  } else {
    return occupation;
  }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing entry object");
  }

  if (!("type" in object)) {
    throw new Error("Incorrect or missing entry type");
  }

  let newEntry: EntryWithoutId;

  switch (object.type) {
    case "HealthCheck": {
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "healthCheckRating" in object
      ) {
        if ("diagnosisCodes" in object) {
          newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: "HealthCheck",
          };
        } else {
          newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            type: "HealthCheck",
          };
        }
        return newEntry;
      }
      throw new Error("Incorrect or missing data for HealthCheck type");
    }

    case "OccupationalHealthcare": {
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "employerName" in object &&
        "sickLeave" in object
      ) {
        if ("diagnosisCodes" in object) {
          newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            type: "OccupationalHealthcare",
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
        } else {
          newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
          };
        }
        return newEntry;
      }
      throw new Error(
        "Incorrect or missing data for OccupationalHealthcare type"
      );
    }

    case "Hospital": {
      if (
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "discharge" in object
      ) {
        if ("diagnosisCodes" in object) {
          newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
        } else {
          newEntry = {
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            discharge: parseDischarge(object.discharge),
            type: "Hospital",
          };
        }
        return newEntry;
      }
      throw new Error("Incorrect or missing data for Hospital type");
    }
  }
  throw new Error("Incorrect entry data: some fields are missing");
};

export default toNewPatientEntry;
