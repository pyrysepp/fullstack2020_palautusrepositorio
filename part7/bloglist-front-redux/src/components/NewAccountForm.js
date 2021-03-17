import Togglable from "./Togglable"
import { useState } from "react"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import userService from "../services/userService"
import { addUser } from "../reducers/usersReducer"
import {
  Button,
  TextField as form,
  TextField,
  Typography,
} from "@material-ui/core"
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
            <TextField
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Password"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button type="submit">register</Button>
        </form>
      </div>
    </Togglable>
  )
}
export default NewAccountForm
