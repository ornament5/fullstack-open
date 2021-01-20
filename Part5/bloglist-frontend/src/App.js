import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './hoc/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ type:null, text:null })

  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
      } catch (e) {
        showNotification('error', `Fetching blogs failed: ${e.message}`)
      }
    }
    if (user) {
      getBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogAppLoggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const credentials = { username, password }
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('blogAppLoggedUser', JSON.stringify(user))
    } catch (e) {
      showNotification('error', `Login failed: ${e.message}`)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppLoggedUser')
    showNotification('success', `User ${user.name} logged out`)
    setUser(null)
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleNewBlogCreation = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(newBlog)
    showNotification('success', `New blog created: "${createdBlog.title}"`)
    setBlogs(blogs.concat(createdBlog))
  }

  const handleBlogLiked = async (blogId) => {
    const likedBlog = blogs.find(blog => blog.id === blogId)
    const likedBlogPosition = blogs.findIndex(blog => blog.id === blogId)
    const  changedBlog = {
      ...likedBlog,
      likes:likedBlog.likes + 1,
      user:likedBlog.user.id
    }
    await blogService.update(changedBlog)
    const updatedBlogs = blogs.concat()
    updatedBlogs[likedBlogPosition].likes++
    setBlogs(updatedBlogs)
  }

  const handleBlogDeletion = async (blogId) => {
    await blogService.remove(blogId)
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
    setBlogs(updatedBlogs)
  }

  const showNotification = (type ,text) => {
    setNotification({ type, text })
    setTimeout(() => setNotification({ type:null, text:null }),2000)
  }

  let pageHeader = 'login to application'
  let loginForm = <LoginForm
    handleLogin={handleLogin}
    username={username}
    password={password}
    handleUsernameChange={handleUsernameChange}
    handlePasswordChange={handlePasswordChange}
  />
  let blogSection = null
  let loggedUser = null
  let blogForm = null

  if(user) {
    pageHeader = 'blogs'
    loginForm = null
    const sortedBlogsByLikes = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
    blogSection = sortedBlogsByLikes.map(blog =>
      <Blog key={blog.id} blog={blog} likeBlog={handleBlogLiked} removeBlog={handleBlogDeletion}/>)
    loggedUser = (
      <div>
        <p>
          {user.name} logged in &nbsp;
          <button onClick={handleLogout}>log out</button>
        </p>
      </div>
    )
    blogForm = (
      <Togglable buttonLabel='add new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlogCreation}/>
      </Togglable>
    )
  }

  return (
    <div>
      <h2>{pageHeader}</h2>
      <Notification type={notification.type} text={notification.text}/>
      {loginForm}
      {loggedUser}
      {blogForm}
      <br/>
      {blogSection}
    </div>
  )
}

export default App