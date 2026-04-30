import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
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
      id: String(persons.length+1)
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
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