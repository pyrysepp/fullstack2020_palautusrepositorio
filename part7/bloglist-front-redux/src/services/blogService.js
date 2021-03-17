import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  console.log("remove: ", response)
  return response.data
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const likeBlog = async (blogToLike) => {
  const url = `/api/blogs/${blogToLike.id}`

  const response = await axios.put(url, blogToLike)

  return response.data
}
const commentBlog = async (id, comment) => {
  const url = `/api/blogs/${id}/comment`

  const response = await axios.put(url, { comment })
  return response.data
}

export default { getAll, create, setToken, likeBlog, remove, commentBlog }
