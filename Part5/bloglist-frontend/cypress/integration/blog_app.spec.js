describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name:'Testoslav',
      username:'Testis',
      password:'Test135'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is displayed by default', function() {
    cy.get('#login-form').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Testis')
      cy.get('#password').type('Test135')
      cy.get('button').click()
      cy.contains('log out').click()
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('WrongTestis')
      cy.get('#password').type('Test135')
      cy.get('button').click()
      cy.get('.error')
        .should('have.css','border-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'Testis', password:'Test135' })
    })

    it('A blog can be created', function() {
      const blog = {
        title:'Testisarium',
        author:'Testislav Spasic',
        url:'www.testislavija.com'
      }

      cy.contains('add new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.contains('create').click()

      cy.get('body').contains('Testisarium Testislav Spasic')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title:'Testisarium',
          author:'Testislav Spasic',
          url:'www.testislavija.com'
        })
      })

      it('blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.blogLikes').contains('1')
      })

      it('user who created the blog can remove it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.blogDiv').should('not.exist')
      })

      it('blog with the most likes is placed on top', function() {
        cy.createBlog({
          title:'Testisarium2',
          author:'Testislav Spasic',
          url:'www.testislavija.com'
        })
        cy.createBlog({
          title:'Testisarium3',
          author:'Testislav Spasic',
          url:'www.testislavija.com'
        })

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('like').click()

        cy.contains('Testisarium2').as('Testisarium2')
        cy.get('@Testisarium2').contains('view').click()
        cy.get('@Testisarium2').contains('like').click()
        cy.get('@Testisarium2').contains('like').click()
        cy.get('@Testisarium2').contains('like').click()
        cy.visit('http://localhost:3000')
        cy.get('.blogDiv').eq(0).should('contain','Testisarium2')
      })
    })

  })

})