import anecdoteService from '../services/anecdoteService';

const sortAnecdotesByVotesDesc = (anecdotes) => {
  return anecdotes.sort((a,b) => b.votes - a.votes)
} 


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_ANECDOTES':
      return sortAnecdotesByVotesDesc(action.data)
    case 'ADD_VOTE':
      const anecdoteVotedFor = state.find(anecdote => anecdote.id === action.data.id)
      const updatedAnecdoteVotedFor = {
        ...anecdoteVotedFor,
        votes:anecdoteVotedFor.votes + 1
      }
      const updatedState = state.map(anecdote => anecdote.id === updatedAnecdoteVotedFor.id ? updatedAnecdoteVotedFor : anecdote)
      return sortAnecdotesByVotesDesc(updatedState)
    case 'CREATE_ANECDOTE':
      return sortAnecdotesByVotesDesc(state.concat(action.data))
    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type:'CREATE_ANECDOTE',
      data: anecdote
    })
  }
}

export const addVote = (anecdoteId) => {
  return async dispatch =>{
   const updatedAnecdote = await anecdoteService.addVote(anecdoteId)
   dispatch({
    type:'ADD_VOTE',
    data: updatedAnecdote
   })
 }
}

export default reducer