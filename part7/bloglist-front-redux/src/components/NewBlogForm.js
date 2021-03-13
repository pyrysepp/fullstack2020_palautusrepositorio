import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

import { createBlogAction } from "../reducers/blogReducer"
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
      <form onSubmit={handleSubmit} id="form">
        <h2>Add a new blog</h2>
        <div>
          title
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id="authorInput"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="urlInput"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
  } else {
    return null
  }
}

export default NewBlogForm
