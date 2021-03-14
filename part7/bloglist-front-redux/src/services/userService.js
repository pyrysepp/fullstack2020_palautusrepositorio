import axios from "axios"

const baseUrl = "/api/users"

const createUser = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { createUser, getAll }
