// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
   Cypress.Commands.add("login", ({username, password}) => {
       cy.request("POST", "http://localhost:3001/api/login", {
           username, password
       }).then(({body}) => {
           localStorage.setItem("loggedBlogAppUser", JSON.stringify(body))
           cy.visit("http://localhost:3000")
       })
   })

   Cypress.Commands.add("createBlog", ({title, author, url, likes}) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    
    const user = JSON.parse(loggedUserJSON)
    
    const bdy = {
        title, author, url, likes
    }
    const config = {
        headers: { Authorization: user.token },
    }

    const options = {
        url: "http://localhost:3001/api/blogs",
        body: bdy,
        method: "POST",
        auth: {bearer: user.token}
    }
       cy.request(options)
       cy.visit("http://localhost:3000")
   })
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
