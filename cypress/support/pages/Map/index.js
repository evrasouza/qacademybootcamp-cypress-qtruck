import { el } from './elements'

class MapPage {

    loggedUser(name) {
        cy.get(el.modalText)
            .should('be.visible')
            .should('have.text', `Olá, ${name}`)
    }

    createLink(){
        cy.get(el.addButton)
            .should('be.visible')
            .click()
    }
}

export default new MapPage()