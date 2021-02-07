import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdotesFrom = ({createAnecdote, showNotification}) => {
    
    const handleNewAnecdote = (e) => {
        e.preventDefault()
        const anecdoteContent = e.target.anecdoteContent.value
        createAnecdote(anecdoteContent)
        showNotification(`You created anecdote:'${anecdoteContent}'`, 3)
    }

    return (
    <>
     <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input id='anecdoteContent' name='anecdoteContent'/></div>
        <button type='submit'>create</button>
      </form> 
      <br />
    </> 
    )
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

export default connect (null, mapDispatchToProps) (AnecdotesFrom)