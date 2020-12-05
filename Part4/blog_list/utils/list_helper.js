const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => sum + blog.likes,0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null
  } else if (blogs.length === 1) {
      return {
         title:blogs[0].title,
         author: blogs[0].author,
         likes: blogs[0].likes
      }
  }

  const sortedBlogsByLikesDesc = blogs.sort( (a, b) => {
      return b.likes - a.likes
  })

  return {
         title:sortedBlogsByLikesDesc[0].title,
         author: sortedBlogsByLikesDesc[0].author,
         likes: sortedBlogsByLikesDesc[0].likes
      }
}

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null
  } else if (blogs.length === 1) {
      return {
         author: blogs[0].author,
         blogs: 1
      }
  }

  const authorsList = [...new Set(blogs.map(blog => blog.author))]
  const blogsPerAuthor = []
  for (let author of authorsList) {
    let blogsCount = 0
    for (let blog of blogs) {
      if(blog.author === author) {
        blogsCount++
      }
    }
    blogsPerAuthor.push({author, blogs:blogsCount})
  }

  return blogsPerAuthor.reduce((leadingAuthor, author) => {
    return author.blogs > leadingAuthor.blogs ?
      author :
      leadingAuthor
  })
}

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null
  } else if (blogs.length === 1) {
      return {
         author: blogs[0].author,
         likes: blogs[0].likes
      }
  }

  const authorsList = [...new Set(blogs.map(blog => blog.author))]
  const likesPerAuthor = []
  for (let author of authorsList) {
    let likesCount = 0
    for (let blog of blogs) {
      if(blog.author === author) {
        likesCount = likesCount + blog.likes
      }
    }
    likesPerAuthor.push({author, likes:likesCount})
  }

  return likesPerAuthor.reduce((leadingAuthor, author) => {
    return author.likes > leadingAuthor.likes ?
      author :
      leadingAuthor
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}