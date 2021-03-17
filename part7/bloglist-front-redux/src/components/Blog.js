import React, { useState } from "react"
// eslint-disable-next-line linebreak-style
import "../styles/Blog.css"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Togglable from "./Togglable"
import {
  likeBlogAction,
  removeBlogAction,
  commentBlogAction,
} from "../reducers/blogReducer"
const Blog = () => {
  const [comment, setComment] = useState("")
  /* const [showFull, setShowFull] = useState(false) */
  const id = useParams().id
  const blog = useSelector((state) => state.blogs).find(
    (blog) => blog.id === id
  )
  const handleComment = (event) => {
    console.log("commented")
    event.preventDefault()
    dispatch(commentBlogAction(id, comment))
  }
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
  /*  if (!showFull) {
    return (
      <div className="Blog">
        {blog.title} {blog.author}
        <button onClick={() => setShowFull(!showFull)}>view</button>
      </div>
    )
  } else { */
  if (!blog) {
    return (
      <div>
        <h3>Seems like this blog doesn't exist (anymore)</h3>
      </div>
    )
  }

  return (
    <div className="Blog">
      <p>{blog.title}</p>
      {/*  <button onClick={() => setShowFull(!showFull)}>hide</button> */}
      <p>{blog.url}</p>
      <p className="likes">
        {blog.likes}{" "}
        <button
          onClick={() => {
            handleLike()
          }}
        >
          like
        </button>
      </p>
      <p>{blog.author}</p>
      <button onClick={() => handleRemove()}>remove</button>
      <h3>Comments</h3>
      {blog.comments.map((c) => (
        <p key={Math.random()}>{c}</p>
      ))}
      <p>Write a new comment!</p>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </form>
    </div>
  )
  /*  } */
}

export default Blog
