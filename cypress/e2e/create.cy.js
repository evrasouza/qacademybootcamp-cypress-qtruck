
import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendação', () => {

  it('deve recomendar um food truck', () => {

    const user = {
      name: 'NotreveLeafar',
      instagram: '@notreveleafar',
      password: 'pwd123'
    }

    const foodtruck = {
      latitude: '-22.875860961595944',
      longitude: '-47.04837391124725',
      name: 'Tienda Del Chavo',
      description: 'O melhor lugar para tomar o suco de limão que parece de groselha e tem gosto de tamarindo',
      opening_hours: 'das 14h às 20h',
      open_on_weekends: false
    }

    cy.apiCreateUser(user)
    cy.uiLogin(user)

    mapPage.createLink()
    createPage.form(foodtruck)
    createPage.submit()

    createPage.modal.haveText('Food truck cadastrado com sucesso!')
    
  })

  
})


