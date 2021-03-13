import React, { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { loginAction, logoutAction } from "../reducers/loginReducer"
import { setNotification } from "../reducers/notificationReducer"
import NewAccountForm from "./NewAccountForm"

const LoginForm = () => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const loginStatus = useSelector((state) => state.login.loginStatus)
  const loggedUser = useSelector((state) => state.login.user)
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginAction({ username, password }))
      setUserName("")
      setPassword("")
      dispatch(setNotification("succesfully logged in", true, 5))
    } catch (error) {
      console.log(error)
      dispatch(setNotification("wrong username or password", false, 5))
    }
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    dispatch(setNotification("succesfully logged out", true, 5))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      console.log("koitetaan JSON PARSE ", loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginAction(user))
    }
  }, [dispatch])

  if (!loginStatus) {
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
  } else {
    return (
      <div>
        <h3>{loggedUser.name} logged in</h3>
        <button onClick={handleLogout}>log out</button>
      </div>
    )
  }
}

export default LoginForm
