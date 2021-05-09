import gql from "graphql-tag"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $favoriteGenre: String!
  ) {
    createUser(
      username: $username
      password: $password
      favoriteGenre: $favoriteGenre
    ) {
      username
    }
  }
`
