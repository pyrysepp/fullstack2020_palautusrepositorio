import React, { useState, useEffect } from "react"
import blogService from "../services/blogService"
import loginService from "../services/loginService"
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
      const loggedUser = await loginService.login({ username, password })

      dispatch(loginAction(loggedUser))

      console.log("handleLogin response. ")
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUserName("")
      setPassword("")
      dispatch(setNotification("succesfully logged in", true, 5))
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(setNotification(error.response.data.message, false, 5))
    }
  }

  const handleLogout = () => {
    dispatch(logoutAction()).then(() => {
      window.localStorage.removeItem("loggedBlogAppUser")
      blogService.setToken(null)
    })
    dispatch(setNotification("succesfully logged out", true, 5))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    console.log(loggedUserJSON)
    if (loggedUserJSON !== null) {
      console.log("koitetaan JSON PARSE ", loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(loginAction(user))
    }
  }, [])

  if (loginStatus) {
    return (
      <div>
        <h3>{loggedUser.name} logged in</h3>
        <button onClick={handleLogout}>log out</button>
      </div>
    )
  } else {
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
}

export default LoginForm
