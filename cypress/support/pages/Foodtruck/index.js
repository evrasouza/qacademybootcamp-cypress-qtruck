

class FoodTruckPage {

    addReview(review) {
        cy.get('textarea[name=comment]').type(review.comment)
        cy.get(`input[name=stars][value="${review.stars}"]`)
            .click({force: true})
        cy.contains('button', 'Enviar avaliação').click()
    }

    validateReview(user, review) {
        cy.get('div[class=details]')
            .should('be.visible')
            .should('have.text', user.name+user.instagram)
        
        cy.get('div[class=comment]')
            .should('be.visible')
            .should('have.text', review.comment)
    }

}

export default new FoodTruckPage()