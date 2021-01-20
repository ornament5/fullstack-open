import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const update = async (updatedBlog) => {
  const blogId = updatedBlog.id
  delete updatedBlog.id
  delete updatedBlog.__v
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, setToken, create, update, remove }