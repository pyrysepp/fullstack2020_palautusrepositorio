import React from 'react'
export const Person = ({person}) => {
    return(
      <div>
        {person.name} {person.number}
      </div>
    )
  }
  
export const Personlist = ({persons}) => {
    return(
      <div>
        {persons.map(p => <Person key={p.id} person={p} />)}
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
