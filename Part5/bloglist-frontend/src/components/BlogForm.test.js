import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


test('<BlogForm/> calls createBlog event handler with correct details on form submit', () => {

  const createBlogMock = jest.fn()
  const component = render(<BlogForm createBlog={createBlogMock}/>)

  const titleInput = component.container.querySelector('#title')
  fireEvent.change(titleInput, { target: { value: 'Kuros' } })

  const createButton = component.getByText('create')
  fireEvent.click(createButton)
  expect(createBlogMock.mock.calls[0][0].title).toBe('Kuros')
})

