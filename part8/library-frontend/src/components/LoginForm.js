import React, { useState, useEffect } from "react"
import RegisterForm from "./RegisterForm"
import { useMutation } from "@apollo/client"
import { CREATE_USER, LOGIN } from "../queries"

const LoginForm = (props) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [register, registerResult] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.message)
    },
  })
  const [login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors)
    },
  })
  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      props.setToken(token)
      window.localStorage.setItem("user-token", token)
    }
  }, [loginResult.data])

  const handleLogin = (event) => {
    event.preventDefault()
    login({ variables: { username: userName, password: password } })
  }
  const handleRegister = (username, password, favoriteGenre) => {
    register({
      variables: {
        username: username,
        password: password,
        favoriteGenre: favoriteGenre,
      },
    })
  }

  if (!props.show || props.token) {
    return null
  } /* 
  return <RegisterForm handleRegister={handleRegister} /> */
  if (!props.token) {
    return (
      <div>
        <form onSubmit={handleLogin}>
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
          <button>login</button>
        </form>
        <div>
          <h2>Create new account</h2>
          <RegisterForm handleRegister={handleRegister} />
        </div>
      </div>
    )
  }
}

export default LoginForm
