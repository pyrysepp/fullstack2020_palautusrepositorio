import Togglable from "./Togglable"
import { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import userService from "../services/userService"
import { addUser } from "../reducers/usersReducer"
const NewAccountForm = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const createdUser = await userService.createUser({
        username,
        name,
        password,
      })
      console.log(createdUser)
      setUsername("")
      setName("")
      setPassword("")
      dispatch(addUser(createdUser))
      dispatch(setNotification("account created succesfully", true, 5))
    } catch (error) {
      console.log("createUser error")
      console.log(error.response)
      dispatch(setNotification(error.response.data.message, false, 5))
    }
  }
  return (
    <Togglable buttonLabel="register">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            Username:
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            Name:
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            Password:
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">register</button>
        </form>
      </div>
    </Togglable>
  )
}
export default NewAccountForm
