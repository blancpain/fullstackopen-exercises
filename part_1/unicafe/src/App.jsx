import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={(e) => handleClick(e)}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props;

  return (
    <>
      {all ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : (
        "No feedback given"
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (e) => {
    const { textContent: buttonValue } = e.target;
    if (buttonValue === "good") setGood(good + 1);
    if (buttonValue === "neutral") setNeutral(neutral + 1);
    if (buttonValue === "bad") setBad(bad + 1);
  };

  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good / all;

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleClick} />
      <Button text="neutral" handleClick={handleClick} />
      <Button text="bad" handleClick={handleClick} />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
