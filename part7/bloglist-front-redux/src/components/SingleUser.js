import { React } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { List, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

const SingleUser = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)
  if (user) {
    return (
      <div className="SingleUser">
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1">added blogs:</Typography>
        <List>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </List>
      </div>
    )
  } else {
    return null
  }
}

export default SingleUser
