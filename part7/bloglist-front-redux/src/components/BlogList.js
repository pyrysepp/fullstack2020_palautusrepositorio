import React, { useRef } from "react"

import { Link } from "react-router-dom"
import _ from "lodash"
import { useSelector } from "react-redux"
import { List, Typography, Grid } from "@material-ui/core"
import Togglable from "./Togglable"
import NewBlogForm from "./NewBlogForm"
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const loginStatus = useSelector((state) => state.login.loginStatus)
  const blogFormRef = useRef()
  /* const loginStatus = useSelector((state) => state.login.loginStatus) */
  if (loginStatus) {
    return (
      <div className="Bloglist">
        <Typography variant="h4">All Blogs</Typography>
        <Grid container direction="row">
          <Togglable ref={blogFormRef} buttonLabel="add new blog">
            <NewBlogForm reff={blogFormRef} />
          </Togglable>
          <List>
            {_.sortBy(blogs, function (b) {
              return -b.likes
            }).map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </List>
        </Grid>
      </div>
    )
  } else {
    return null
  }
}

export default BlogList
