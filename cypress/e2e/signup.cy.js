import signupPage from '../support/pages/Signup'

describe('signup', () => {
  it('deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Massa na Caveira',
      instagram: '@massanacaveira',
      password: 'pwd123'
    }

    //cy.deleteMany({ instagram: user.instagram }, { collection: 'users' }).then(res => {
    //cy.log(res);
    //});

    cy.apiResetUser(user.instagram)

    signupPage.go()
    signupPage.form(user)
    signupPage.submit()

    signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')
  })

  it('não deve cadastrar com instagram duplicado', () => {

    const user = {
      name: 'Cia da Fome',
      instagram: '@ciadafome',
      password: 'pwd123'
    }

    cy.apiCreateUser(user)

    signupPage.go()
    signupPage.form(user)
    signupPage.submit()

    signupPage.modal.haveText('Instagram já cadastrado!')
  })

  it('nao deve cadastrar sem preencher o campo nome', () => {

    const user = {
      instagram: '@baiodedois',
      password: 'pwd123'
    }

    signupPage.go()
    signupPage.form(user)
    signupPage.submit()

    signupPage.modal.haveText('Por favor, informe o seu nome completo!')
  })

  it('nao deve cadastrar sem preencher o campo código do instagram', () => {

    const user = {
      name: 'Baião de Dois',
      password: 'pwd123'
    }

    signupPage.go()
    signupPage.form(user)
    signupPage.submit()

    signupPage.modal.haveText('Por favor, informe o seu código do Instagram!')
  })

  it('nao deve cadastrar sem preencher o campo senha', () => {

    const user = {
      name: 'Pesto Pizza',
      instagram: '@pestopizza'
    }

    signupPage.go()
    signupPage.form(user)
    signupPage.submit()

    signupPage.modal.haveText('Por favor, informe a sua senha secreta!')
  })

  it('todos os campos devem ser obrigatórios', () => {

    signupPage.go()
    signupPage.form({})
    signupPage.submit()

    signupPage.modal.haveText('Por favor, preencha todos os campos!')
  })

})


