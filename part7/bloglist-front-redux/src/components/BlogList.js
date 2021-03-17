import React from "react"
import Blog from "./Blog"
import { Link } from "react-router-dom"
import _ from "lodash"
import { useSelector } from "react-redux"
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const loginStatus = useSelector((state) => state.login.loginStatus)

  /* const loginStatus = useSelector((state) => state.login.loginStatus) */
  if (loginStatus) {
    return (
      <div className="Bloglist">
        {_.sortBy(blogs, function (b) {
          return -b.likes
        }).map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default BlogList
