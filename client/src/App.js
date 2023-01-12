import { useState, useEffect } from "react";
import ErrorNotification from "./ErrorNotification";
import Filter from "./Filter";
import Notification from "./Notification";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { getAll, create, deletePersons,updatePerson } from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState("");
  const [createMessage, setCreateMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      console.log(initialPersons);
      setPersons(initialPersons);
    });
  }, []);


  const deletePerson = (id) => {
    deletePersons(id)
    console.log('deleted');
    setPersons(persons.filter((person) => person.id !== id));
  };


  const addPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} already has the number ${newNumber}`);
        return;
      }
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        updatePerson(existingPerson.id, updatedPerson)
          .then((response) => {
            console.log(response);
            setPersons(persons.map((person) => person.id !== existingPerson.id ? person : updatedPerson));
            setCreateMessage(
              ` ${updatedPerson.name} number has changed`
            )
            setTimeout(() => {
              setCreateMessage(null)
            }, 5000)
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(
              `Information of ${updatedPerson.name} has alredy been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          });
      }
    } else {
      if(persons.some((person)=> person.number === newNumber)){
        alert(`The number ${newNumber} already belongs to another person`);
        return;
      }
      const newPerson = { name: newName, number: newNumber };
      create(newPerson)
        .then((newPerson) => {
          console.log(newPerson);
          setPersons([...persons, newPerson]);
          setNewName("");
          setNewNumber("");
          setCreateMessage(
            `Added ${newPerson.name}`
          )
          setTimeout(() => {
            setCreateMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  

  const handleFindName = (e) => {
    setFindName(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
  person?.name.toLowerCase().includes(findName.toLowerCase())
);


  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={createMessage} />
        <ErrorNotification errorMessage={errorMessage}/>
        <div>
          <Filter findName={findName} handleFindName={handleFindName} />
        </div>
        <form onSubmit={addPerson}>
          <h1>add a new</h1>
          <PersonForm newName={newName} setNewName={setNewName} />
          <div>
            phone:{" "}
            <input
              value={newNumber}
              type="number"
              onChange={(event) => setNewNumber(event.target.value)}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>

        <h2>Numbers</h2>
        <Persons
          filteredPersons={filteredPersons}
          deletePerson={deletePerson}
        />
      </div>
    </>
  );
}

export default App;