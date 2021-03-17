import React, { useState } from "react"
// eslint-disable-next-line linebreak-style
import "../styles/Blog.css"
import { setNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import Togglable from "./Togglable"
import {
  likeBlogAction,
  removeBlogAction,
  commentBlogAction,
} from "../reducers/blogReducer"
import { Button, TextField, Typography, Grid } from "@material-ui/core"
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
        <Button onClick={() => setShowFull(!showFull)}>view</Button>
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
    <div className="blog">
      <Grid>
        <Typography variant="h5">{blog.title}</Typography>
        {/*  <Button onClick={() => setShowFull(!showFull)}>hide</Button> */}
        <Typography variant="body1">
          <a href={blog.url}>{blog.url}</a>
        </Typography>

        <div className="likes">
          <Typography variant="h6">{blog.likes} Likes </Typography>
          <Button
            onClick={() => {
              handleLike()
            }}
          >
            like
          </Button>
        </div>

        <Typography variant="body1">{blog.author}</Typography>
        <Button onClick={() => handleRemove()}>remove</Button>
      </Grid>
      <Typography variant="h5">Comments</Typography>
      {blog.comments.map((c) => (
        <div className="SingleComment" key={Math.random()}>
          <Typography variant="body1">{c}</Typography>
        </div>
      ))}
      <div>
        <form onSubmit={handleComment}>
          <Typography variant="body2">Write a new comment!</Typography>
          <TextField
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button type="submit">Post</Button>
        </form>
      </div>
    </div>
  )
  /*  } */
}

export default Blog
