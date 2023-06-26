import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredNumbers, setFilteredNumbers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.some((person) => person.name === newName);
    if (personExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else if (newName === "") {
      alert("Please add a name.");
      return;
    } else if (newNumber === "") {
      alert("Please add a number.");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value === "") {
      setFilteredNumbers([]);
    } else {
      const currentFilteredNumbers = persons.filter((person) => {
        return person.name.toLowerCase().includes(value.toLowerCase());
      });

      setFilteredNumbers([...currentFilteredNumbers]);
    }
  };

  const allNumbers = persons.map((person) => {
    return (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    );
  });

  const allFilteredNumbers = filteredNumbers.map((person) => {
    return (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        filteredNumbers={filteredNumbers}
        search={search}
        allNumbers={allNumbers}
        allFilteredNumbers={allFilteredNumbers}
      />
    </div>
  );
};

export default App;
