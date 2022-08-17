import { el } from './elements'

class MapPage {

    loggedUser(name) {
        cy.get(el.modalText)
            .should('be.visible')
            .should('have.text', `Olá, ${name}`)
    }
}

export default new MapPage()