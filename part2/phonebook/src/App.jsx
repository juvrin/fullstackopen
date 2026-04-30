import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({newSearch, handleSearch, setShowAll, showAll}) => {
  return(
    <div>filter shown with 
        <input value={newSearch} onChange={handleSearch}/>
        <button onClick={() => setShowAll(!showAll)}>{showAll? 'filter' : 'show all'}</button>
    </div>
  )
}

const PersonForm = ({newName, handleNameChange, newNumber,handleNumberChange, handleAdd})=>{
  return(
  <form>
    <div>name: <input value={newName} onChange={handleNameChange}/></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div>
      <button type="submit" onClick={handleAdd}>add</button>
    </div>
  </form>
  )
}


const Persons = ({filteredPersons}) => {
  return(
    <ul>
        {filteredPersons.map((person,id)=> <li key={id}>{person.name} {person.number}</li>)}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
    })
}, [])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredPersons = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase()===newSearch.toLowerCase())


  const handleAdd = (event) => {
    event.preventDefault()
    if(persons.filter(person=>person.name.toLowerCase()===newName.toLowerCase()).length !==0){
      alert(`${newName} is already added to phonebook`)
    }else{

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
  })
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} setShowAll={setShowAll} showAll={showAll}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber ={newNumber}
       handleNumberChange={handleNumberChange} handleAdd={handleAdd}/>
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
      

      <div>debug: {newSearch}</div>
    </div>
    
  )
}

export default App