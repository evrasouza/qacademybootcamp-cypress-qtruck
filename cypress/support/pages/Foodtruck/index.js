import modal from '../components/Modal'

class FoodTruckPage {

    constructor() {
        this.modal = modal
    }

    addReview(review) {
        cy.get('textarea[name=comment]').type(review.comment)
        cy.get(`input[name=stars][value="${review.stars}"]`)
            .click({force: true})
        cy.contains('button', 'Enviar avaliação').click()
    }

    reviewShouldBe(user, review) {
        cy.contains('.review-box', user.instagram).as('reviewBox')

        cy.get('@reviewBox')
            .find('.comment p')
            .should('have.text', review.comment)
        
        cy.get('@reviewBox')
            .find('.stars svg')
            .should('have.length', review.stars)
    }

    checkEmptyReviewFields(review){
        cy.get('textarea[name=comment]')
        .should('be.empty')

        cy.get(`input[name=stars][value="${review.stars}"]`)
        .should('not.be.checked')
    }

}

export default new FoodTruckPage()