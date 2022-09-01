import { el } from './elements'
import modal from '../components/Modal'

class CreatePage {

    constructor() {
        this.modal = modal
    }

    form(foodtruck) {
        cy.setGeolocation(foodtruck.latitude, foodtruck.longitude)

        if (foodtruck.name) cy.get('input[name=name]').type(foodtruck.name)
        if (foodtruck.details) cy.get('textarea[name=details]').type(foodtruck.details)
        if (foodtruck.opening_hours) cy.get('input[name=opening-hours]').type(foodtruck.opening_hours)

        cy.contains('button', foodtruck.open_on_weekends ? 'Sim' : 'Não' )
            .click()
    }

    submit() {
        // comparando Xpath com o contains do Cypress
        //button[text()="Cadastrar"]
        cy.contains('button', 'Cadastrar').click()
    }

}

export default new CreatePage()