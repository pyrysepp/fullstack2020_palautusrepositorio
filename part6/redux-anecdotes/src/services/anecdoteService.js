import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const createOne = async (content) => {
  const anecdote = {
    content: content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, anecdote)

  return response.data
}

const voteAnecdote = async (id) => {
  const get = await axios.get(`${baseUrl}/${id}`)
  const anecdote = get.data

  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  console.log("vote", response.data)
  return response.data
}

export default { getAll, createOne, voteAnecdote }
