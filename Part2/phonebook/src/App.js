import React, { useState, useEffect } from 'react';
import personService from './personService';
import './App.css';

const Filter = ({searchValue, changeHandler}) => {
    return (
      <div>
        filter shown with: <input value={searchValue} onChange={changeHandler}/>
      </div>
    );
};

const PersonForm = ({nameValue, nameChangedHandler, numberValue, numberChangedHandler, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <h3>add a new</h3>
      <div>
        name: <input value={nameValue} onChange={nameChangedHandler}/>
      </div>
      <div>
        number: <input value={numberValue} onChange={numberChangedHandler}/>
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  );
};

const Button = ({clickHandler, text}) => {
  return <button onClick={clickHandler}>{text}</button>
};

const Person = ({person, deleteHandler}) => {
  return <p>{person.name} {person.number} <Button text='delete' clickHandler={() => deleteHandler(person.id)} /></p>
};

const Persons = ({persons, filter, deleteHandler}) => {
  return persons
      .filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      .map(person => <Person key={person.id} person={person} deleteHandler={deleteHandler} />);
};

const Alert = ({type, text}) => {
  if(text === null) {
    return null;
  } else {
    return <div className={`${type} alert`}>{text}</div>;  
  }
};

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');
  const [ alert, setAlert ] = useState({type:null, text:null});

  useEffect(() => {
    personService.getAll()
      .then( persons => setPersons(persons));
  }, []);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = e => {
    setNewFilter(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (newName !== '') {
      if (isNameDuplicate(newName, persons)) {
        const updatePersonConfirmed = window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`);
        if (updatePersonConfirmed) {
          const personToUpdate = persons.find(person => person.name === newName);
          const updatedPerson = {...personToUpdate, number:newNumber};
          personService.update(personToUpdate.id, updatedPerson)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
              setNewName('');
              setNewNumber('');}
            )
            .catch((error) => {
              let errorMessage = `Information of ${newName} has already been removed from server`
              if (error.response.data.error.errors.number &&
                error.response.data.error.errors.number.name === 'ValidatorError') {
                  errorMessage = error.response.data.error.message
              }                
              showAlert('error', errorMessage);
            });
        }
      } else {
        personService.create(newName, newNumber)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
          showAlert('success', `Added ${newName}`);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          showAlert('error', error.response.data.error.message);          
        });
      };  
    };
  };

  const handleDeletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name;
    const deleteConfirmed = window.confirm(`Delete ${personName}?`);
    if (deleteConfirmed) {      
      personService.remove(id)
      .then(status => {
        if (status === 204) {
          setPersons(persons.filter(person => person.id !== id));
        }
      });
    }
  };

  const showAlert = (type ,text) => {
    setAlert({type, text});
    setTimeout(() => setAlert({type:null, text:null}),2000);
  }

  const isNameDuplicate = (newName, personsList) => {
    return personsList.some((person) => person.name === newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert type={alert.type} text={alert.text}/>
      <Filter searchValue={newFilter} changeHandler={handleFilterChange} />
      <PersonForm 
        nameValue={newName}
        nameChangedHandler={handleNameChange}
        numberValue={newNumber}
        numberChangedHandler={handleNumberChange}
        submitHandler={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} deleteHandler={handleDeletePerson}/>
    </div>
  );
};

export default App;