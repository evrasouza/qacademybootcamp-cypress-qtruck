
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
      latitude: '-22.88012',
      longitude: '-47.04733',
      name: 'Tienda Del Chavo',
      details: 'O melhor lugar para tomar o suco de limão que parece de groselha e tem gosto de tamarindo',
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

  it('não deve cadastrar foodtruck com nome duplicado', () => {
        const user = {
          name: 'Bruce',
          instagram: '@bruce',
          password: 'pwd123'
      }

      const foodtruck = {
        latitude: '-22.88107',
        longitude: '-47.04692',
          name: 'Churros da Dona Florinda',
          details: 'O melhor churros mexicado da região.',
          opening_hours: 'das 15h às 19h',
          open_on_weekends: false
      }

      cy.apiCreateUser(user)
      cy.apiLogin(user)
      cy.apiCreateFoodTruck(foodtruck)

      cy.uiLogin(user)
      
      mapPage.createLink()
      createPage.form(foodtruck)
      createPage.submit()
      createPage.modal.haveText('Esse food truck já foi cadastrado!')
  })



  it('todos os campos são obrigatórios', () => {

    const user = {
      name: 'Sebastião',
      instagram: '@sebastian',
      password: 'pwd123'
    }

    const foodtruck = {
      latitude: '-22.88111',
      longitude: '-47.04819',
    }

    cy.apiCreateUser(user)
    cy.uiLogin(user)

    mapPage.createLink()
    cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)
    createPage.submit()

    const message = 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
    createPage.modal.haveText(message)

  })

})


