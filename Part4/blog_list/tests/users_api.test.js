const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUser = {
    username:'Test1',
    name:'Lale Gator',
    password:'Test'
}
  
beforeEach(async () => {
    await User.deleteMany({})
    const userModel = new User(initialUser)
    await userModel.save()
})

test('creating new user fails with status code 400 if the username is missing or has length < 3', async () => {
    const currentUsers = await api.get('/api/users')
    const invalidUser = {
        username:'a',
        password:'abc'
    }

    await api.post('/api/users')
      .send(invalidUser)
      .expect(400)
    
    const currentUsersAfter = await api.get('/api/users')
    expect(currentUsersAfter.body.length).toBe(currentUsers.body.length)
})

test('creating new user fails with status code 400 if the password is missing or has length < 3', async () => {
    const currentUsers = await api.get('/api/users')
    const invalidUser = {
        username:'abc',
        password:'a'
    }

    await api.post('/api/users')
      .send(invalidUser)
      .expect(400)
    
    const currentUsersAfter = await api.get('/api/users')
    expect(currentUsersAfter.body.length).toBe(currentUsers.body.length)
})

afterAll(() => mongoose.connection.close())