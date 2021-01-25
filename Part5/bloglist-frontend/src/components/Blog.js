import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [ fullDetailsVisible, setFullDetailsVisible] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let additionalDetails = null
  let buttonText = 'view'
  let removeButton = 'Blaaa'
  const loggedUser = JSON.parse(localStorage.getItem('blogAppLoggedUser'))
  if(loggedUser && blog.user.username === loggedUser.username) {
    removeButton = <button onClick = {() => removeBlog(blog.id)}>remove</button>
  }

  if (fullDetailsVisible) {
    buttonText = 'hide'
    additionalDetails = (
      <div>
        <p className='blogUrl'>{blog.url}</p>
        <p className='blogLikes'>{blog.likes} <button onClick={() => likeBlog(blog.id)}>like</button></p>
        <p>{blog.user.name}</p>
        {removeButton}
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blogDiv'>
      {blog.title} {blog.author} &nbsp;
      <button onClick={() => setFullDetailsVisible(!fullDetailsVisible)}>{buttonText}</button>
      {additionalDetails}
    </div>
  )
}

export default Blog
