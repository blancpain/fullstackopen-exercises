import { NewDiaryEntry } from "../types";
import { useState } from "react";

type Props = {
  createDiaryEntry: (arg: NewDiaryEntry) => void;
};

const NewDiaryEntryForm = (props: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    props.createDiaryEntry(newEntry);
    setDate("");
    setComment("");
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date{" "}
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          visibility:
          <label htmlFor="great"> great </label>
          <input
            type="radio"
            name="visibility"
            value={visibility}
            id="great"
            onChange={() => setVisibility("great")}
          />
          <label htmlFor="good"> good </label>
          <input
            type="radio"
            name="visibility"
            id="good"
            value={visibility}
            onChange={() => setVisibility("good")}
          />
          <label htmlFor="ok"> ok </label>
          <input
            type="radio"
            name="visibility"
            value={visibility}
            id="ok"
            onChange={() => setVisibility("ok")}
          />
          <label htmlFor="poor"> poor </label>
          <input
            type="radio"
            name="visibility"
            id="poor"
            value={visibility}
            onChange={() => setVisibility("poor")}
          />
        </div>
        <div>
          weather:
          <label htmlFor="sunny"> sunny </label>
          <input
            type="radio"
            name="weather"
            id="sunny"
            value={weather}
            onChange={() => setWeather("sunny")}
          />
          <label htmlFor="rainy"> rainy </label>
          <input
            type="radio"
            name="weather"
            value={weather}
            id="rainy"
            onChange={() => setWeather("rainy")}
          />
          <label htmlFor="cloudy"> cloudy </label>
          <input
            type="radio"
            name="weather"
            value={weather}
            id="cloudy"
            onChange={() => setWeather("cloudy")}
          />
          <label htmlFor="stormy"> stormy </label>
          <input
            type="radio"
            name="weather"
            value={weather}
            id="stormy"
            onChange={() => setWeather("stormy")}
          />
          <label htmlFor="windy"> windy </label>
          <input
            type="radio"
            name="weather"
            value={weather}
            id="windy"
            onChange={() => setWeather("windy")}
          />
        </div>
        <div>
          comment{" "}
          <input
            type="text"
            name="comment"
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewDiaryEntryForm;
