import { el } from './elements'

class Modal {

    haveText(text) {
        cy.get(el.swal2Component)
            .should('be.visible')
            .should('have.text', text)
    }
}


export default new Modal()