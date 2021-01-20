import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        title:
        <input id='title' value={title} name='title' onChange={e => setTitle(e.target.value)}/>
      </label>
      <br/>
      <label>
        author:
        <input value={author} name='author' onChange={e => setAuthor(e.target.value)}/>
      </label>
      <br/>
      <label>
        url:
        <input value={url} name='url' onChange={e => setUrl(e.target.value)}/>
      </label>
      <br/>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm