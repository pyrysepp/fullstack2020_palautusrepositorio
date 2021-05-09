import React, { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import { useApolloClient } from "@apollo/client"
/*
TODO:
tokenin lähetys kirjaa lisätessä ✅
genre filtteröinti
lempigenren kirjat ("recommendations")
graphqllä sama?
*/
const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const apolloClient = useApolloClient()

  useEffect(() => {
    const existingToken = window.localStorage.getItem("user-token")
    if (existingToken) {
      setToken(existingToken)
    }
  }, [])
  const handleLogout = () => {
    setToken(null)
    window.localStorage.removeItem("user-token")
    apolloClient.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("login")}>login</button>
        {token ? <button onClick={() => handleLogout()}>logout</button> : null}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />
      <LoginForm setToken={setToken} token={token} show={page === "login"} />
      <NewBook show={page === "add" && token !== null} />
    </div>
  )
}

export default App
