
import React, { useState, useEffect } from 'react'
import {Personlist, Search} from "./modules/Personlist.js"
import personServices from "./services/persons.js"
import {NotificationMessage} from "./modules/Notification.js"

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [searchField, setSearch] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  
  useEffect(() => {
    personServices.getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    console.log(newPerson.name, persons)
    if(persons.some(p => p.name === newName)) {
      console.log("Täälä ollaan");
      if(window.confirm(`${newName} already exists in the phonebook, do you want to update the number?`)) {
        const existingPerson = persons.find(p=> p.name === newPerson.name)
        const updatedPerson = {...existingPerson, number: newPerson.number}
        console.log(updatedPerson)
        personServices.update(existingPerson.id, updatedPerson)
        .then(returned => {

         setPersons(persons.map(p => p.id !== existingPerson.id ? p : returned))
         setNewName('')
         setNewNumber('')
         setStatusMessage({
           message: `Updated the number of ${newPerson.name}`,
           good: true 
        })
         setTimeout(()=> setStatusMessage(null),5000)
        })
        .catch(error => {
          console.log(error)
          setStatusMessage(``)
        })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
    personServices.create(newPerson)
    .then(createdPerson => {
      setPersons(persons.concat(createdPerson))
      setNewName('')
      setNewNumber('')
      setStatusMessage({
        message: `Added ${newPerson.name}`,
        good: true
      })
      setTimeout(()=> setStatusMessage(null),5000)
    })
    .catch(error => console.log(error))
  }
  }

 const handleDelete = (e, id) => {
   e.preventDefault()

   personServices.updateDelete(id)
   .then(data => {
     
     setPersons(persons.filter(p => p.id !== id))
   })
   .catch(error => {
     console.log(error)
     setStatusMessage({
       message: `Information of ${persons.find(p=> p.id === id).name} has already been deleted from the server`,
       good: false
     })
     setTimeout(()=> setStatusMessage(null),5000)
     setPersons(persons.filter(p => p.id !== id))
   })
 }

  const handleSearch = (event) => {
      setSearch(event.target.value)
      
  }

  const handleInput = (event) => {
    
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
      <NotificationMessage message={statusMessage} />
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
      <Personlist handleDelete={handleDelete} persons={dSearch()} />
    </div>
  )

}

export default App

