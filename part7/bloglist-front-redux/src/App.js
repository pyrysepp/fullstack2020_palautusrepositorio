import React, { useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import SingleUser from "./components/SingleUser"
import NewBlogForm from "./components/NewBlogForm"
import StatusMessage from "./components/StatusMessage"
import Togglable from "./components/Togglable"
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

  const blogFormRef = useRef()
  const loginStatus = useSelector((state) => state.login.loginStatus)
  if (loginStatus) {
    return (
      <div>
        <Navigation />
        <StatusMessage />
        <Route path="/"></Route>
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <h2>Blogs</h2>
            <Togglable ref={blogFormRef} buttonLabel="add new blog">
              <NewBlogForm reff={blogFormRef} />
            </Togglable>
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
      </div>
    )
  } else {
    return (
      <div>
        <Navigation />
        <StatusMessage />
        <LoginForm />
      </div>
    )
  }
}

export default App
