
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

  it.only('não deve cadastrar foodtruck com nome duplicado', () => {

    // Regra UM: Massa de Testes deve ser independente
    // Regra DOIS: Latitude e Longitude deve ser única
    // Regra TRES: você deve encontrar e corrigir o bug nesse cenário

    const user = {
      name: 'Rodrigo',
      instagram: '@rodrigoduarte',
      password: 'pwd123'
    }

    const foodtruck = {
      latitude: '-22.90348',
      longitude: '-47.06327',
      name: 'Pesto Pizza',
      description: 'Aqui é a melhor pizza de campinas eleita 10 vezes a melhor do brasil',
      opening_hours: '18:00hrs até 23:30hrs',
      open_on_weekends: true
    }

    cy.apiCreateUser(user)
    cy.uiLogin(user)
    mapPage.createLink()
    createPage.modal.haveText('Food truck cadastrado com sucesso!')
    //cy.createRecomendation(user, foodtruck)

    createPage.form(foodtruck)
    createPage.submit()
    cy.visit('http://localhost:3000/foodtrucks/create')

    createPage.form(foodtruck)
    createPage.submit()
    createPage.modal.haveText('Esse food fruck já foi cadastrado!')

  })

  it('todos os campos são obrigatórios', () => {

    const user = {
      name: 'Sebastião',
      instagram: '@sebastian',
      password: 'pwd123'
    }

    cy.apiCreateUser(user)
    cy.uiLogin(user)

    mapPage.createLink()
    createPage.form({})
    createPage.submit()

    createPage.modal.haveText('O campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!')

  })

})


