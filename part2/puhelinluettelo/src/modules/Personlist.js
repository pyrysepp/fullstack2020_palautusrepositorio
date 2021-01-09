import React from 'react'
import personsServices from '../services/persons.js'


export const Person = ({person, handleDelete}) => {
    
    return(
      <div>
        {person.name} {person.number} <button onClick={e => handleDelete(e, person.id)}>Delete</button>
      </div>
    )
  }
  
export const Personlist = ({persons,handleDelete}) => {
  
    return(
      <div>
        {persons.map(p => <Person key={p.id} handleDelete={handleDelete} person={p} />)}
      </div>
    )
  }
export const Search = ({searchField, setSearch}) => {
  
    return(
      <div>
        
          <div>
            Search: <input type='text' value={searchField} onChange={setSearch} />
          </div>
        
      </div>
    )
  }
  
