import React, { useState, useEffect } from "react"
import blogService from "../services/blogService"
import loginService from "../services/loginService"
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "../reducers/loginReducer"
import { setNotification } from "../reducers/notificationReducer"
import NewAccountForm from "./NewAccountForm"

const LoginForm = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const loginStatus = useSelector((state) => state.login.loginStatus)
  const loggedUser = useSelector((state) => state.login.user)
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loginAction({ username, password }))

    setUserName("")
    setPassword("")
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          Username
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <NewAccountForm />
    </div>
  )
}

export default LoginForm
