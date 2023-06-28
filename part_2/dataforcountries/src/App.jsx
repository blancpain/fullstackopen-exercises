import { useEffect, useState } from "react";
import countryServices from "./services/countryServices";
import Country from "./components/Country";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryServices.getAll().then((data) => {
      setAllCountries(data);
    });
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value === "") {
      setFilteredCountries([]);
      setSelectedCountry(null);
    } else {
      const currentFilteredCountries = allCountries.filter((country) => {
        return country.name.common.toLowerCase().includes(value.toLowerCase());
      });

      setSelectedCountry(null);
      setFilteredCountries([...currentFilteredCountries]);
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
      {filteredCountries.length === 1 ? (
        <Country fullData={filteredCountries[0]} />
      ) : (
        allFilteredCountries
      )}
      {selectedCountry && <Country fullData={selectedCountry} />}
    </div>
  );
}

export default App;
