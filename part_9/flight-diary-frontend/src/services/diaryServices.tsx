import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaryEntries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiaryEntry = async (obj: NewDiaryEntry) => {
  try {
    const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, obj);
    return response.data;
  } catch (error) {
    let errorMessage: string = "";
    if (
      axios.isAxiosError(error) &&
      error.response &&
      typeof error.response.data === "string"
    ) {
      errorMessage += error.response.data;
      return errorMessage;
    } else {
      errorMessage = "Something when wrong. Please try again";
      return errorMessage;
    }
  }
};
