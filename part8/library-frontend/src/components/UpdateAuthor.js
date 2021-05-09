import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
const UpdateAuthor = ({ authors }) => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => console.log(error),
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const onSubmit = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { name, born: parseInt(year) } })
    setYear("")
    setName("")
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="" selected disabled hidden>
              select name
            </option>
            {authors.map((a, index) => (
              <option key={a + index} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          {/*  <input
            name="name"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>
        <div>
          <label htmlFor="birthyear">born</label>
          <input
            name="birthyear"
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}
export default UpdateAuthor
