const listHelper = require('../utils/list_helper')

const blogList = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
}, {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}, {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
}, {
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
}, {
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0
}, {
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  test('of an empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a list with one blog equals the likes of that', () => {
    const blog = [blogList[0]]

    const result = listHelper.totalLikes(blog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {   
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(36)
  })
})

describe('favoriteBlog', () => {
  test('of an empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('of a list with one blog equals that blog', () => {
    const blog = [blogList[0]]
    const expected = {title:blogList[0].title, author:blogList[0].author, likes:blogList[0].likes}

    const result = listHelper.favoriteBlog(blog)
    expect(result).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {   
    const result = listHelper.favoriteBlog(blogList)
    const expected = {title:'Canonical string reduction', author:'Edsger W. Dijkstra', likes:12}

    expect(result).toEqual(expected)
  })
})

describe('mostBlogs', () => {
  test('of an empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('of a list with one blog equals the author of that blog', () => {
    const blog = [blogList[0]]
    const expected = {author:blog[0].author, blogs:1}

    const result = listHelper.mostBlogs(blog)
    expect(result).toEqual(expected)
  }) 

  test('of a bigger list is calculated right', () => {   
    const result = listHelper.mostBlogs(blogList)
    const expected = {author:'Robert C. Martin', blogs:3}

    expect(result).toEqual(expected)
  })
})

describe('mostLikes', () => {
  test('of an empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('of a list with one blog equals the likes count of that blog', () => {
    const blog = [blogList[0]]
    const expected = {author:blog[0].author, likes:blog[0].likes}

    const result = listHelper.mostLikes(blog)
    expect(result).toEqual(expected)
  })

  test('of a bigger list is calculated right', () => {   
    const result = listHelper.mostLikes(blogList)
    const expected = {author:'Edsger W. Dijkstra', likes:17}

    expect(result).toEqual(expected)
  })
})