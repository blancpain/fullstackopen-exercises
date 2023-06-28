/* eslint-disable react/prop-types */
export default function Country({ fullData }) {
  const fullName = fullData.name.common;
  const { capital } = fullData;
  const { area } = fullData;
  const flagURL = fullData.flags.png;
  const languages = [];

  for (const item in fullData.languages) {
    languages.push(fullData.languages[item]);
  }
  const allLanguages = languages.map((language) => {
    return <li key={language}>{language}</li>;
  });

  return (
    <div>
      <h1>{fullName}</h1>

      <p>capital: {capital}</p>
      <p>area: {area.toLocaleString("en-US")} km</p>
      <h4>languages:</h4>
      <ul>{allLanguages}</ul>
      <br />
      <img src={flagURL} alt="country flag" />
    </div>
  );
}
