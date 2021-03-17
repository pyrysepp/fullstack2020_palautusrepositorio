import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

import { createBlogAction } from "../reducers/blogReducer"
import { TextField, Button, Typography } from "@material-ui/core"
const NewBlogForm = ({ reff }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.login.loginStatus)
  const createBlog = async (blogObject) => {
    try {
      dispatch(createBlogAction(blogObject))
      dispatch(
        setNotification(
          `${blogObject.title} by ${blogObject.author} added`,
          true,
          5
        )
      )
      reff.current.toggleVisibility()
    } catch (error) {
      console.log("we here")
      console.log(error.response.data.error)
      dispatch(setNotification(error.response.data.error, false, 5))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  if (loginStatus) {
    return (
      <form className="NewBlogForm" onSubmit={handleSubmit} id="form">
        <div>
          <TextField
            label="Title"
            id="titleInput"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            id="authorInput"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="URL"
            id="urlInput"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit">create</Button>
      </form>
    )
  } else {
    return null
  }
}

export default NewBlogForm
