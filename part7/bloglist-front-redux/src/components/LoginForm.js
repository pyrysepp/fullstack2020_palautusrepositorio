import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "../reducers/loginReducer"

import NewAccountForm from "./NewAccountForm"
import { TextField, Button } from "@material-ui/core"
const LoginForm = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const loginStatus = useSelector((state) => state.login.loginStatus)
  const loggedUser = useSelector((state) => state.login.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loginAction({ username, password }))
    history.push("/")
    setUserName("")
    setPassword("")
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          <TextField
            label="Username"
            id="usernameInput"
            type="text"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            id="passwordInput"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
      <NewAccountForm />
    </div>
  )
}

export default LoginForm
