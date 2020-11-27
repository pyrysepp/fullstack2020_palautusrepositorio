import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Personlist, Search} from "./modules/Personlist.js"

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [searchField, setSearch] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
    })
  }
  
  useEffect(hook,[])

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons.some(person => person.name === newName))

    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = 
        {name: newName,
         number: newNumber,
         id: persons.length + 1
        }
      
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      
    }
  }
  const handleSearch = (event) => {
      setSearch(event.target.value)
      console.log(dSearch)
  }
  const handleInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
    
  }
  const dSearch = () => {
    
    return persons.filter(p => p.name.toLowerCase().includes(searchField.toLocaleLowerCase()))
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchField={searchField} setSearch={handleSearch} />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Personlist persons={dSearch()} />
    </div>
  )

}

export default App

