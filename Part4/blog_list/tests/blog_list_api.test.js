const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'Fat Hipster',
    author: 'Neki Lik',
    url: 'https://www.fathipster.net/',
    likes:534
  },
  {
    title: 'B92 Bloga',
    author: 'Veran Matic',
    url: 'https://www.b92.net/',
    likes:334   
  }
]

const initialUser = {
  username:"Test",
  password:"Test"
}

let token = null

beforeAll(async () => {
    await User.deleteMany({})
    const newTestUser = await api
      .post('/api/users')
      .send(initialUser)
    const loggedInUser = await api
      .post('/api/login')
      .send(initialUser)
    token = loggedInUser.body.token 
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let blogModel = new Blog({...blog, user:newTestUser.body.id})
        await blogModel.save()
    }  
})

test('GET request to /api/blogs returns correct amount of blogs in JSON format', async () => {
    await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
    .expect(response => {
        if (response.body.length !== initialBlogs.length) {
            throw new Error ('Body length is incorrect')
        }
    })
})
describe('creating new blogs via POST request', () => {
    test('is successfull if all obligatory properties are provided', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Mr.Nobody',
            url: 'https://www.test.net/',
            likes:1
        }
        const savedNewBlog = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`)
        expect(savedNewBlog.body.title).toEqual(newBlog.title)
    
        const allBlogsResponse = await api.get('/api/blogs')
        expect(allBlogsResponse.body).toHaveLength(initialBlogs.length + 1)
    })

    test('fails with status code 400 if the title and/or url properties are missing', async () => {
        const incompleteBlog = {
            author:'Mr. Sloppy',
            likes:2
        }

        await api.post('/api/blogs')
          .send(incompleteBlog)
          .set('Authorization', `bearer ${token}`)
          .expect(400)
    })
})


test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
})

test('if likes property is missing from the request, it will default to 0', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Mr.Nobody',
        url: 'https://www.test.net/',
    }

    const savedNewBlog = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`)    
    expect(savedNewBlog.body.likes).toBe(0)
})

afterAll(() => mongoose.connection.close())