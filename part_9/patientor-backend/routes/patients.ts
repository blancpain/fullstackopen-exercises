import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectedPatient = patientService.findById(id);

  if (selectedPatient) {
    res.send(selectedPatient);
  } else {
    res.status(400).send("Cannot find patient");
  }
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (e) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).json(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    let errorMessage = "Something went wrong. ";
    if (e instanceof Error) {
      errorMessage += "Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
