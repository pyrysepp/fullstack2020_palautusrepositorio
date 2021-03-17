import { React } from "react"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Typography,
} from "@material-ui/core"
const AllUsers = () => {
  const users = useSelector((state) => state.users)
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4">Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AllUsers
