const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title:1, author:1, url:1, id:1 });  
    response.json(users)
})
  
usersRouter.post('/', async (request, response, next) => {
    const body = request.body;
    if(!body.username || !body.password) {        
        const error = new Error('Username or password missing');
        error.name='ValidationError'
        next(error)
        return
    } else if (body.password.length < 3) {
        const error = new Error('Password must be at least 3 characters long');
        error.name='ValidationError'
        next(error)
        return
    }  

    const saltRounds = 10;
    const passHash = await bcrypt.hash(body.password, saltRounds);
     const user = new User({
        username: body.username,
        name: body.name,
        password:passHash
    })

    try { 
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter