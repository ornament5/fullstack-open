import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


const AnecdotesList = ({anecdotes, addVote, showNotification}) => {
  
    const handleClick = (anecdote) => {
      addVote(anecdote.id)
      showNotification(`You voted '${anecdote.content}'`, 7)
    }

    return (
        anecdotes
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleClick(anecdote)}>vote</button>
              </div>
            </div>
          )
    )
}

const mapStateToProps = (state) => {
  const anecdotes = state.anecdotes.filter((anecdote) => anecdote.content.indexOf(state.filter) > -1)
  return {
    anecdotes
  }
}

const mapDispatchToProps = {
  addVote,
  showNotification
}

export default connect (mapStateToProps, mapDispatchToProps) (AnecdotesList)