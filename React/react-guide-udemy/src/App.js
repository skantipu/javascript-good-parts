import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person'

const App = () => {
  const data =
      [
        {
            name: 'Sachin',
            age: 50,
            id: 'asdf'
        },
        {
            name: 'Girish',
            age: 22,
            id: 'w34'
        },
        {
            name: 'Mandakini',
            age: 11,
            id: '354v'
        }
      ];
  const [personsData, setPersonsState] = useState(data);
  const [showPersons, setShowPersonsState] = useState(true);
  const togglePersonsState = () => {
    if (personsData.length === 0) {
        setPersonsState(data);
        setShowPersonsState(true);
        return;
    }
    setShowPersonsState(!showPersons);
  }
  const deletePersonHandler = (ev, i) => {
    setPersonsState(personsData.filter((el, ind) => ind !== i));
  };
  const inputChangeHandler = (ev, id) => {
      const updatedPersonsData = personsData.map(person => {
         if (person.id === id)  {
             person.name = ev.target.value;
         }
         return person;
      });
      setPersonsState(updatedPersonsData);
  }
  const persons = personsData.map((person, index) =>
      <Person
          name = {person.name}
          age = {person.age}
          inputChange = {(ev) => inputChangeHandler(ev, person.id)}
          deletePerson = {(ev) => deletePersonHandler(ev, index)}
          key ={person.id} />);

  return (
    <div className="App">
      <h1> Hello Starting </h1>
      <button onClick={togglePersonsState}>Toggle Persons</button>
      {
        showPersons ? persons : null
      }
    </div>
  );
}

export default App;
