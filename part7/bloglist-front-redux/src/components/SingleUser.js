import { React } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUser = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)
  if (user) {
    return (
      <div>
        <h3>{user.name}</h3>
        <h4>added blogs</h4>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default SingleUser
