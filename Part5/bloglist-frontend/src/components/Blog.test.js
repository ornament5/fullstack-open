import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('Renders title and author, but not url or number of likes by default', () => {
    const newBlog = {
      title:'Kukuriku',
      author:'Petao',
      url:'www.kokoda.com'
    }
    const component = render(<Blog blog={newBlog}/>)

    const blogDiv = component.container.querySelector('.blogDiv')
    expect(blogDiv).toHaveTextContent(`${newBlog.title} ${newBlog.author}`)

    // url, likes & author are in <p/> elements
    const p = component.container.querySelector('p')
    expect(p).toBeNull()
  })

  test('Renders url and number of likes when the view-button is clicked', () => {
    const newBlog = {
      title:'Kukuriku',
      author:'Petao',
      url:'www.kokoda.com',
      likes:5,
      user:{ name:'Test' }
    }
    const component = render(<Blog blog={newBlog}/>)

    const viewButton = component.container.querySelector('.blogDiv button')
    fireEvent.click(viewButton)

    const url = component.container.querySelector('.blogUrl')
    expect(url).toHaveTextContent(`${newBlog.url}`)

    const likes = component.container.querySelector('.blogLikes')
    expect(likes).toHaveTextContent('5')
  })

  test('if like button is clicked twice, the event handler is called twice', () => {
    const newBlog = {
      title:'Kukuriku',
      author:'Petao',
      url:'www.kokoda.com',
      likes:5,
      user:{ name:'Test' },
    }
    const likeBlogHandler = jest.fn()
    const component = render(<Blog blog={newBlog} likeBlog={likeBlogHandler}/>)

    const viewButton = component.container.querySelector('.blogDiv button')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeBlogHandler.mock.calls).toHaveLength(2)
  })
})
