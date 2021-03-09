describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = 
      {
          "username": "cypress",
          "name": "cypress",
          "password": "salasana"
      }
      cy.request("POST", "http://localhost:3001/api/users", user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.get(".loginForm")
    })


describe("logging in", function() {
    it("logging in works", function() {
        cy.get("input#usernameInput")
        .type("cypress")

        cy.get("input#passwordInput")
        .type("salasana")

        cy.contains("login")
        .click()
    })

    it("logging in with wrong credentials shouldn't work", function(){
        cy.contains("log out").click()
        cy.get("#usernameInput")
        .type("asdasdasd")

        cy.get("#passwordInput")
        .type("salasana")

        cy.contains("login").click()

        cy.contains("wrong username or password")
        cy.get(".badStatus")
    })

   
  })

  describe("When logged in", function() {
      beforeEach(function() {
          cy.login({username: "cypress", password: "salasana"})
      })

      it("a blog can be created", function() {
          cy.contains("add new blog").click()

          cy.get("#titleInput").type("test-title")
          cy.get("#authorInput").type("test-author")
          cy.get("#urlInput").type("test-url")

          cy.contains("create").click()
          
          cy.get(".Bloglist").contains("test-title")
        
          
      })

      
  })
  describe("interaction with created blog", function() {
      beforeEach(function() {
        cy.login({username: "cypress", password: "salasana"})

        cy.createBlog({title: "test-title", author: "test-author", url: "test-url", likes: 0})
        
      })

      it("created blog can be liked", function() {
        cy.contains("view").click()
        cy.get(".likes").contains("0")
        cy.contains("like").click()
        cy.get(".likes").contains("1")
    })

    it("user who created the blog can delete it", function() {
        cy.contains("view").click()
        cy.contains("remove").click()
        cy.contains("test-title").should("not.exist")
    })
  })

  describe("sorting of the blogs", function() {
    beforeEach(function() {
      cy.login({username: "cypress", password: "salasana"})
      cy.createBlog({title: "test-title1", author: "test-author1", url: "test-url1", likes: 0})
      cy.createBlog({title: "test-title2", author: "test-author2", url: "test-url2", likes: 10})
      cy.createBlog({title: "test-title3", author: "test-author3", url: "test-url3", likes: 2})
      cy.createBlog({title: "test-title4", author: "test-author4", url: "test-url4", likes: 1})
    })

    it("order of blogs is correct", function() {
      cy.get(".Blog")
        .then((list) => {
        cy.log(list)
        Array.prototype.forEach.call(list, b  => cy.wrap(b).contains("view").click())
        
        const elem1 = list[0]
        const elem2 = list[1]
        const elem3 = list[2]
        const elem4 = list[3]
       
        cy.wrap(elem1).contains("test-title2")
        cy.wrap(elem2).contains("test-title3")
        cy.wrap(elem3).contains("test-title4")
        cy.wrap(elem4).contains("test-title1")
        
        })

      
    })
  })
  
})