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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loginPage from './pages/Login'
import createPage from './pages/Create'
import mapPage from './pages/Map'

Cypress.Commands.add('apiResetUser', (instagram) => {
  cy.request({
    url: 'http://localhost:3333/helpers-reset',
    method: 'DELETE',
    qs: { instagram: instagram }
  }).then(response => {
    expect(response.status).to.eql(204)
  })
})


Cypress.Commands.add('apiCreateUser', (payload) => {

  cy.apiResetUser(payload.instagram)

  cy.request({
    url: 'http://localhost:3333/signup',
    method: 'POST',
    body: payload
  }).then(response => {
    expect(response.status).to.eql(201)
  })
})

Cypress.Commands.add('uiLogin', (user) => {

  loginPage.go()
  loginPage.form(user)
  loginPage.submit()

  mapPage.loggedUser(user.name)
})

Cypress.Commands.add('setGeoLocation', (lat, long) => {
  localStorage.setItem('qtruck:latitude', lat)
  localStorage.setItem('qtruck:longitude', long)
})

Cypress.Commands.add('apiLogin', function (user, setLocalStorage = false) {

  const payload = {
    instagram: user.instagram,
    password: user.password
  }

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/sessions',
    body: payload
  }).then(function (response) {
    expect(response.status).to.eql(200)
    Cypress.env('apiToken', response.body.token)

    if (setLocalStorage) {
      const { token, user } = response.body

      window.localStorage.setItem('qtruck:token', token)
      window.localStorage.setItem('qtruck:user', JSON.stringify(user))

      cy.log('Passei Aqui de novo')
    }

  })

  if (setLocalStorage) cy.visit('http://localhost:3000/foodtrucks/create')

})



Cypress.Commands.add('createRecomendation', (user, payload) => {

  //cy.apiCreateUser(user)
  cy.apiLogin(user, true)

  cy.request({
    url: 'http://localhost:3333/foodtrucks',
    method: 'POST',
    body: payload,
    headers: {
      authorization: 'Bearer ' + Cypress.env('apiToken')
    }
  }).then(response => {
    expect(response.status).to.eql(201)
  })


})