import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Persons = ({persons, setPersons, setErrorMessage}) => {
  const deletePhoneOf = id => {    
    if (window.confirm("Do you really want to delete this?")) {
      const person = persons.find((p) => p.id === id)
      personService
        .remove(id)
        .then(returnedNote => {
          console.log(returnedNote);
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          const message = {
            text:  `Information of ${person.name} has already been removed from server'`,
            style: 'error'
          }
          setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }    
  }

  return(
    <ul>
        {persons.map((person) =>
          <Person key={person.id} person={person} deletePhone = {() => deletePhoneOf(person.id)}/>
        )}
    </ul>
  )
}
    

const Person = ({ person, deletePhone }) => <li>{person.name} {person.number} <button onClick={deletePhone}>delete</button></li>

const PersonForm = ({ persons, setPersons, setErrorMessage }) => {

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault();
    let personArray = persons.map((person) => person.name)
    if(!personArray.includes(newName)){
      const personObject = {
        name: newName,
        number: newNumber
      }      
      personService
        .create(personObject)
        .then(returnedNote => {
          setNewName('')  
          setNewNumber('') 
          setPersons(persons.concat(returnedNote))
          const message = {
            text:  `Added ${returnedNote.name}`,
            style: 'sucess'
          }
          setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
         
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        const id = person.id;      
        personService
          .update(id, changedPerson)
          .then(returnedNote => {
            setPersons(persons.map(p => p.id !== id ? p : returnedNote))
          })
      } 
    }
  }

  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Filter = ({ filterValue, setfilterValue }) => {
  const showFiltered = (event) => setfilterValue(event.target.value)
  return (
    <div>
          filter shown with<input value={filterValue} onChange={showFiltered}/>
    </div>
  )
}

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className={message.style}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {    
    personService
    .getAll()
    .then(initialDirectory => {
      setPersons(initialDirectory)
    })
  }, [])

  const [ filterValue, setfilterValue ] = useState('') 
  
  return (
    <div>
      <h2>Phonebook</h2>  
      <Notification message={errorMessage} />
      <Filter filterValue = {filterValue} setfilterValue={setfilterValue}/>
      <h2>Add a new</h2>
      <PersonForm persons = {persons} setPersons = {setPersons} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Persons persons = {persons.filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App