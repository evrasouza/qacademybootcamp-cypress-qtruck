import { el } from './elements'
import modal from '../components/Modal'

class CreatePage {

    constructor() {
        this.modal = modal
    }

    form(foodtruck) {
        cy.setGeoLocation(foodtruck.latitude, foodtruck.longitude)

        if (foodtruck.name) cy.contains('label', 'Nome')
                                .parent()
                                .find('input').type(foodtruck.name)

        //if (foodtruck.name) cy.get(el.name).clear().type(foodtruck.name)
        if (foodtruck.description) cy.get(el.description).clear().type(foodtruck.description)
        if (foodtruck.opening_hours)  cy.get(el.opening_hours).clear().type(foodtruck.opening_hours)

        cy.contains('button', foodtruck.open_on_weekends ? 'Sim' : 'Não')
            .click()

        //if(foodtruck.open_on_weekends === 'Sim')
            //cy.contains('button', 'Sim').click()
        //if(foodtruck.open_on_weekends === 'Não')
            //cy.contains('button', 'Não').click()
    }

    submit() {
        cy.contains(el.submit).click()
    }


}

export default new CreatePage()