require("dotenv").config()
const {
  ApolloServer,
  gql,
  UserInputError,
  ValidationError,
  PubSub,
} = require("apollo-server")
const mongoose = require("mongoose")
const Book = require("./schemas/Book")
const Author = require("./schemas/Author")
const User = require("./schemas/User")
const jwt = require("jsonwebtoken")
const pubsub = new PubSub()
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECERET = "NOT VERY SECRET KEY"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type Book {
    title: String
    published: Int
    author: String
    id: ID!
    genres: [String]
  }
  type Author {
    name: String
    born: Int
    bookCount: Int
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
    me: User
  }
  type Mutation {
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book
    addAuthor(name: String, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String
    ): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (args.author) {
        return Book.find({ author: args.author })
      }
      if (args.genre) {
        /*  return books.filter((b) => b.genres.includes(args.genre)) */
        return Book.find({ genres: args.genre })
      }
      return Book.find({})
    },
    allAuthors: () => {
      const authors = Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new ValidationError("not logged in on an User")
      }
      const exist = await Author.exists({ name: args.author })
      if (!exist) {
        console.log("author did not exist, creating new one")
        const newAuthor = new Author({ name: args.author, bookCount: 1 })

        try {
          await newAuthor.save()
          const newBook = new Book({ ...args, author: newAuthor.id })
          await newBook.save()
          return newBook
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        console.log("we here")
        const updatedAuthor = await Author.findOne({ name: args.author }).exec()
        const newBook = new Book({ ...args, author: updatedAuthor.id })

        try {
          await updatedAuthor.save()
          await newBook.save()
          updatedAuthor.bookCount = updatedAuthor.bookCount + 1
          await updatedAuthor.save()
          console.log("addBook authorUpdate", updatedAuthor)
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
        return newBook
      }
    },
    editAuthor: async (root, args, context) => {
      /* if(!authors.find(a => a.name === args.name)){
            return null
        } */
      if (!context.currentUser) {
        throw new ValidationError("not logged in on an User")
      }
      const authorToUpdate = await Author.findOne({ name: args.name })
      console.log("update author: ", authorToUpdate)
      authorToUpdate.born = args.setBornTo
      await authorToUpdate.save()
      return authorToUpdate
    },

    createUser: async (root, args) => {
      newUser = new User({ ...args })
      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidAgs: args,
        })
      }

      return newUser
    },

    login: async (root, args) => {
      const userToLogin = await User.findOne({ username: args.username })
      if (!userToLogin || userToLogin.password !== args.password) {
        throw new UserInputError("no user found or password is incorrect")
      }

      const userforToken = {
        uasername: userToLogin.username,
        id: userToLogin.id,
      }

      const token = jwt.sign(userforToken, JWT_SECERET)
      console.log("token: ", token)
      return { value: token }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECERET)
      console.log(auth.substring(8))
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
