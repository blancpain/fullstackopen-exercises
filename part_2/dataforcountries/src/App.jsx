import { useEffect, useState } from "react";
import countryServices from "./services/countryServices";
import weatherServices from "./services/weatherServices";
import Country from "./components/Country";
import Weather from "./components/Weather";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryServices.getAll().then((data) => {
      setAllCountries(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      weatherServices
        .get(selectedCountry.capital)
        .then((data) => setWeather(data));
    }
  }, [selectedCountry]);

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
      setWeather(null);
    } else {
      const currentFilteredCountries = allCountries.filter((country) => {
        return country.name.common.toLowerCase().includes(value.toLowerCase());
      });

      setWeather(null);
      setSelectedCountry(null);
      setFilteredCountries([...currentFilteredCountries]);

      // use current array because filteredCountries might not be updated yet due to async nature of state setting
      if (currentFilteredCountries.length === 1) {
        setSelectedCountry(currentFilteredCountries[0]);
      }
    }
  };

  const showCountry = (e) => {
    const { name } = e.target;

    const currentSelectedCountry = filteredCountries.find(
      (country) => country.name.common === name
    );
    setSelectedCountry(currentSelectedCountry);
  };

  const allFilteredCountries = filteredCountries.map((country) => (
    <div key={country.name.common}>
      <span>{country.name.common}</span>
      <button name={country.name.common} onClick={showCountry}>
        show
      </button>
    </div>
  ));

  return (
    <div className="content">
      <span>find countries</span>
      <input type="text" onChange={handleSearch} />

      {selectedCountry ? (
        <Country fullData={selectedCountry} />
      ) : (
        allFilteredCountries
      )}
      <br />
      {weather && <Weather data={weather} />}
    </div>
  );
}

export default App;
