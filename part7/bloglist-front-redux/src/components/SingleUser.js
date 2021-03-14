import React from "react"

const SingleUser = (user) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUser
