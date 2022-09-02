import mapPage from '../support/pages/Map'
import foodTruckPage from '../support/pages/Foodtruck'

describe('Avalidações', ()=> {

    it('deve enviar uma nova avaliação', ()=> {

        const user = {
            name: 'Madruga Ramon',
            instagram: '@madruguinha',
            password: 'pwd123'
        }

        const foodtruck = {
            latitude: '-22.88111',
            longitude: '-47.04819',
            name: 'Super de Quico',
            details: 'Sucos de alta qualidade direto do saquinho.',
            opening_hours: 'das 14h às 20h',
            open_on_weekends: false
        }

        const review = {
            comment: 'O suco de limão estava muito bom, mas veio muito pouco.',
            stars: 4
        }

        cy.apiCreateUser(user)
        cy.apiLogin(user)
        cy.apiCreateFoodTruck(foodtruck)

        cy.uiLogin(user)

        mapPage.goToFoodtruck(foodtruck.name)
        foodTruckPage.addReview(review)

    })

})