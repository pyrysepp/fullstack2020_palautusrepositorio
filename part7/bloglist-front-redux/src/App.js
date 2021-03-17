import React, { useEffect } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import SingleUser from "./components/SingleUser"
import StatusMessage from "./components/StatusMessage"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"
import AllUsers from "./components/AllUsers"
import { Switch, Route, Link } from "react-router-dom"
import { initUsers } from "./reducers/usersReducer"
import Navigation from "./components/Navigation"
import blogService from "./services/blogService"
import { loggedUserAction } from "./reducers/loginReducer"
import Blog from "./components/Blog"
import Home from "./components/Home"
import { Container } from "@material-ui/core"
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    /* let mounted = true */
    dispatch(initializeBlogs())
    dispatch(initUsers())
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    console.log(loggedUserJSON)
    if (loggedUserJSON !== null) {
      console.log("koitetaan JSON PARSE ", loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      /*  if (mounted) { */
      dispatch(loggedUserAction(user))
      /*  } */
    }
    /* return () => (mounted = false) */
  }, [dispatch])

  const loginStatus = useSelector((state) => state.login.loginStatus)
  if (loginStatus) {
    return (
      <Container>
        <Navigation />
        <StatusMessage />
        <Route path="/"></Route>
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <BlogList />
          </Route>
          <Route path="/users/:id">
            <SingleUser />
          </Route>
          <Route path="/users">
            <AllUsers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    )
  } else {
    return (
      <Container>
        <Navigation />
        <StatusMessage />
        <LoginForm />
      </Container>
    )
  }
}

export default App
