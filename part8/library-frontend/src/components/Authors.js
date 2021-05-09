import React from "react"
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import UpdateAuthor from "./UpdateAuthor"
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    onError: (error) => console.log(error),
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>authors loading</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a, index) => (
            <tr key={a.name + index}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token !== null ? (
        <UpdateAuthor authors={result.data.allAuthors} />
      ) : null}
    </div>
  )
}

export default Authors