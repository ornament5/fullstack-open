import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const anecdote = {
        content,
        votes:0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const addVote = async (id) => {
    const anecdoteResponse = await axios.get(`${baseUrl}/${id}`)
    const anecdoteToUpdate = anecdoteResponse.data
    anecdoteToUpdate.votes = anecdoteToUpdate.votes + 1
    const response = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate)
    return response.data
}

export default { getAll, createNew, addVote }