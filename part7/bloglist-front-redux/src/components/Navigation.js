import React from "react"
import { Link } from "react-router-dom"
import blogService from "../services/blogService"
import { useSelector, useDispatch } from "react-redux"
import { logoutAction } from "../reducers/loginReducer"
import { setNotification } from "../reducers/notificationReducer"
const Navigation = () => {
  const login = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const handleLogout = () => {
    console.log("handleLogout kutsuttu")
    dispatch(logoutAction())
  }
  if (!login.loginStatus) return null
  return (
    <nav>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <p>{`${login.user.name} logged in`}</p>
      <button onClick={handleLogout}>logout</button>
    </nav>
  )
}
export default Navigation
