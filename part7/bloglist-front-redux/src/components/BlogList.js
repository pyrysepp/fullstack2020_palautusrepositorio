import React from "react"
import Blog from "./Blog"

import _ from "lodash"
import { useSelector } from "react-redux"
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const loginStatus = useSelector((state) => state.login.loginStatus)
  /* const loginStatus = useSelector((state) => state.login.loginStatus) */
  if (loginStatus) {
    return (
      <div className="Bloglist">
        <h2>blogs</h2>
        {_.sortBy(blogs, function (b) {
          return -b.likes
        }).map((blog) => (
          <Blog key={blog.id} testHandler={() => null} blog={blog} />
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default BlogList
