import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blogId}`, config);

  return response;
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  console.log(response);
  return response;
};

const likeBlog = async (blogToLike) => {
  const url = `/api/blogs/${blogToLike.id}`;

  const response = await axios.put(url, blogToLike);

  return response;
};

export default { getAll, create, setToken, likeBlog, remove };
