import React, { useEffect, useState } from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { ALL_BOOKS, BOOK_ADDED } from "../queries"
import Select from "react-select"
const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const client = props.client

  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    client.writeQuery({
      query: ALL_BOOKS,
      data: { allBooks: dataInStore.allBooks.concat(addedBook) },
    })
    console.log("cache", dataInStore)
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert("new book added")
      console.log(client.readQuery({ query: ALL_BOOKS }))
      updateCacheWith(subscriptionData.data.bookAdded)
      /* console.log(result.subscriptionData.data.bookAdded)
      setBooks(books.concat(result.subscriptionData.data.bookAdded))
      const createdOptions = createOptions(books)
      setOptions(createdOptions) */
    },
  })
  const [books, setBooks] = useState([])
  const [options, setOptions] = useState([])
  const [genreFilter, setGenreFilter] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      const createdOptions = createOptions(result.data.allBooks)
      setOptions(createdOptions)
    }
  }, [result.data, client.readQuery({ query: ALL_BOOKS })])

  const createOptions = (booksParameter) => {
    const genres = booksParameter.map((b) => b.genres)
    const flatGenres = genres.flat()
    const filteredFlatGenres = flatGenres.filter((a) => a)
    const set = [...new Set(filteredFlatGenres)]
    const mappedArray = set.map((g) => {
      return { value: g.toLowerCase(), label: g }
    })

    return mappedArray
  }
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>All books loading</div>
  }
  const mappedBooks = (books, filter) => {
    if (!filter) {
      return books.map((a, index) => (
        <tr key={a.title + index}>
          <td>{a.title}</td>
          <td>{a.author}</td>
          <td>{a.published}</td>
        </tr>
      ))
    } else {
      return books
        .filter((b) => b.genres.includes(filter.value))
        .map((a, index) => (
          <tr key={a.title + index}>
            <td>{a.title}</td>
            <td>{a.author}</td>
            <td>{a.published}</td>
          </tr>
        ))
    }
  }
  /* if (result.data) {
    setOptions(createOptions(books))
  } */
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {mappedBooks(books, genreFilter)}
        </tbody>
      </table>
      <div>
        <Select
          options={options}
          onChange={(option) => setGenreFilter(option)}
          isClearable={true}
          value={genreFilter}
          placeholder={"filter by genre"}
        />
      </div>
    </div>
  )
}

export default Books
