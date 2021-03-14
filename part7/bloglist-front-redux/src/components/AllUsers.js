import { React, useEffect, useState } from "react"
import userService from "../services/userService"

const AllUsers = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    async function getUsers() {
      const users = await userService.getAll()
      setUsers(users)
    }
    getUsers()
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>User</td>
            <td>Blogs Created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
