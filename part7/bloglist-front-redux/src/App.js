import React, { useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import StatusMessage from "./components/StatusMessage"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()
  const loginStatus = useSelector((state) => state.login.loginStatus)
  if (loginStatus) {
    return (
      <div>
        <StatusMessage />
        <LoginForm />
        <Togglable ref={blogFormRef} buttonLabel="add new blog">
          <NewBlogForm reff={blogFormRef} />
        </Togglable>
        <BlogList />
      </div>
    )
  } else {
    return (
      <div>
        <StatusMessage />
        <LoginForm />
      </div>
    )
  }
}

export default App
