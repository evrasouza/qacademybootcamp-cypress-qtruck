import { el } from './elements'
import modal from '../components/Modal'

class LoginPage {

    constructor() {
        this.modal = modal
    }

    go() {
        cy.visit('/')
        cy.contains(el.title).should('be.visible')
    }

    form(user) {
        if (user.instagram) cy.get(el.instagram).clear().type(user.instagram)
        if (user.password) cy.get(el.password).clear().type(user.password)
    }

    submit() {
        cy.contains(el.signIn).click()
    }
}

export default new LoginPage()