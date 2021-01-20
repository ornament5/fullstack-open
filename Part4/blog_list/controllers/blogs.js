const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1, id:1 }); 
  response.json(blogs)
})
    
blogsRouter.post('/', async (request, response, next) => {
  let decodedToken;
  try {
    decodedToken = await jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return next(error)
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({...request.body, user:user._id})
  if (blog.title && blog.url) {
    if (!blog.likes) {
      blog.likes = 0
    }  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id) 
    await user.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  } 
})

blogsRouter.delete('/:id', async (request, response, next) => {
  let decodedToken;
  try {
    decodedToken = await jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return next(error)
  }
  const blogToDelete = await Blog.findById(request.params.id)
  
  if (decodedToken.id !== blogToDelete.user.toString()) {
    return response.status(403).json({error:"User is not authorized to delete the requested document"})
  }

  const deletingUser = await User.findById(decodedToken.id)  
  await Blog.findByIdAndDelete(request.params.id)
  deletingUser.blogs = deletingUser.blogs.filter(blog => blog.id !== request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedInformation = {
    ...body
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedInformation, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogsRouter