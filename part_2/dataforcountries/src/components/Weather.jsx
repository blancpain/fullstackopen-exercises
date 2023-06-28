export default function Weather({ data }) {
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div>
      <h2>Weather in {data.name}</h2>
      <p>temperature: {data.main.temp} Celcius</p>
      <img src={weatherIcon} alt="weather icon" />
      <p>wind {data.wind.speed} m/s</p>
    </div>
  );
}
