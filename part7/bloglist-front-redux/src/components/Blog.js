import React, { useState } from "react"
// eslint-disable-next-line linebreak-style
import "../styles/Blog.css"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { likeBlogAction, removeBlogAction } from "../reducers/blogReducer"
const Blog = ({ blog, testHandler }) => {
  const [showFull, setShowFull] = useState(false)

  const dispatch = useDispatch()
  const handleLike = async () => {
    try {
      dispatch(likeBlogAction(blog))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async () => {
    try {
      dispatch(removeBlogAction(blog))
      dispatch(
        setNotification(
          `succesfully deleted ${blog.title} by ${blog.author}`,
          true,
          5
        )
      )
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.data.error, false, 5))
    }
  }
  if (!showFull) {
    return (
      <div className="Blog">
        {blog.title} {blog.author}
        <button onClick={() => setShowFull(!showFull)}>view</button>
      </div>
    )
  } else {
    return (
      <div className="Blog">
        <p>{blog.title}</p>
        <button onClick={() => setShowFull(!showFull)}>hide</button>
        <p>{blog.url}</p>
        <p className="likes">
          {blog.likes}{" "}
          <button
            onClick={() => {
              handleLike()
              testHandler()
            }}
          >
            like
          </button>
        </p>
        <p>{blog.author}</p>
        <button onClick={() => handleRemove()}>remove</button>
      </div>
    )
  }
}

export default Blog
