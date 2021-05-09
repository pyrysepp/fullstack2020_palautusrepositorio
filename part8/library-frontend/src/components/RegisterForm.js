import React, { useState, useEffect } from "react"

const RegisterForm = (props) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [genre, setGenre] = useState("")
  const handleRegister = (event) => {
    event.preventDefault()
    props.handleRegister(userName, password, genre)
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            Username
            <input
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Favorite genre
            <input
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </label>
        </div>
        <button>register</button>
      </form>
    </div>
  )
}
export default RegisterForm
