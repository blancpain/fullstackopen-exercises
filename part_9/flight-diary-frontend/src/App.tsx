import { useState, useEffect } from "react";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
import { getAllDiaryEntries, addDiaryEntry } from "./services/diaryServices";
import { nanoid } from "nanoid";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm";
import Notification from "./components/Notification";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    getAllDiaryEntries().then((data) => setDiaries(data));
  }, []);

  const allDiaries = diaries.map((diary) => {
    return (
      <div key={nanoid()}>
        <h2>{diary.date}</h2>
        <p>visibility: {diary.visibility}</p>
        <p>weather: {diary.weather}</p>
      </div>
    );
  });

  const createDiaryEntry = async (newEntry: NewDiaryEntry) => {
    const objectToBeProcessed = await addDiaryEntry(newEntry);

    if (typeof objectToBeProcessed !== "string") {
      setDiaries([...diaries, objectToBeProcessed]);
    } else {
      setNotification(objectToBeProcessed);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <>
      <Notification message={notification} />
      <NewDiaryEntryForm createDiaryEntry={createDiaryEntry} />
      <h1>Diary entries</h1>
      {allDiaries}
    </>
  );
}

export default App;
