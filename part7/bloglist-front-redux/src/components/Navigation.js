import React from "react"
import { Link } from "react-router-dom"
import blogService from "../services/blogService"
import { useSelector, useDispatch } from "react-redux"
import { logoutAction } from "../reducers/loginReducer"
import { AppBar, Button, Typography, Toolbar, Grid } from "@material-ui/core"
const Navigation = () => {
  const login = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const handleLogout = () => {
    console.log("handleLogout kutsuttu")
    dispatch(logoutAction())
  }
  if (!login.loginStatus)
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="body1">Blog app</Typography>
        </Toolbar>
      </AppBar>
    )
  return (
    <AppBar position="static">
      <Grid container direction="row">
        <Toolbar>
          <Typography variant="body1">{`${login.user.name} logged in`}</Typography>
        </Toolbar>
        <Button color="inherit">
          <Link to="/">Home</Link>
        </Button>
        <Button>
          <Link to="/blogs">blogs</Link>
        </Button>
        <Button>
          <Link to="/users">users</Link>
        </Button>
        <Button onClick={handleLogout}>logout</Button>
      </Grid>
    </AppBar>
  )
}
export default Navigation
