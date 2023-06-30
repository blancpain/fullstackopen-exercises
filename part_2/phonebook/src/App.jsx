import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Persons from "./components/Persons";
import personServices from "./services/personServices";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personServices.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.some((person) => person.name === newName);

    if (newName === "" || newNumber === "") {
      alert("Please fill out both fields.");
      return;
    } else if (personExists) {
      const existingPerson = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        handleNumberUpdate(existingPerson);
        return;
      } else {
        return;
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personServices.create(newPerson).then((newData) => {
      setPersons([...persons, newData]);
      setNewName("");
      setNewNumber("");
    });

    setNotification(`Added ${newPerson.name}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNumberUpdate = (existingPerson) => {
    const updatedPerson = {
      ...existingPerson,
      number: newNumber,
    };

    personServices
      .update(Number(updatedPerson.id), updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : returnedPerson
          )
        );
        setNewName("");
        setNewNumber("");

        setNotification(`Changed number for ${updatedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch(() => {
        setNotification(
          `${updatedPerson.name} has already been removed from the server`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== updatedPerson.id));
      });
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

  const handleDelete = (e) => {
    const { name: id } = e.target;

    const selectedPerson = persons.find((person) => person.id === Number(id));

    if (window.confirm(`Delete ${selectedPerson.name}?`)) {
      personServices.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== Number(id)));
      });
    } else {
      return;
    }
  };

  const allNumbers = persons.map((person) => {
    return (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        personID={person.id}
        handleDelete={handleDelete}
      />
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
      <Notification message={notification} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new person</h2>
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
