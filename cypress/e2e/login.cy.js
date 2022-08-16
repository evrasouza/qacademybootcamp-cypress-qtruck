describe('login', () => {
  it('deve logar com sucesso', () => {
    const user = {
      name: 'Everton',
      instagram: '@evertonsouza',
      password: 'pwd123'
    }
    cy.login(user)
    cy.loggedUser(user.name)
  })

  it('nao deve logar com senha invalida', () => {
    const user = {
      instagram: '@evertonsouza',
      password: 'abc123'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  it('nao deve logar com instagram inexistente', () => {
    const user = {
      instagram: '@souzaeverton',
      password: 'pwd123'
    }
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  it('quando não preencho o campo senha', () => {
    const user = {
      instagram: "evertonsouza"
    }
    cy.passwordEmpty(user)
    cy.modalHaveText('Por favor, informe a sua senha secreta!')

  })

  it('quando não preencho o campo código do Instagram', () => {
    const user = {
      password: "pwd123"
    }
    cy.instagramEmpty(user)
    cy.modalHaveText('Por favor, informe o seu código do Instagram!')

  })

  it('quando não preencho nenhum dos campos', () => {
    cy.loginFieldsEmpty()
    cy.modalHaveText('Por favor, informe suas credenciais!')

  })

  context('quando não preencho o(s) campo(s)', () => {

    const message = [
      { instagram: '@souzaeverton', password: '{backspace}', message: 'Por favor, informe a sua senha secreta!' },
      { instagram: '{backspace}', password: 'pwd123}', message: 'Por favor, informe o seu código do Instagram!' },
      { instagram: '{backspace}', password: '{backspace}', message: 'Por favor, informe suas credenciais!' }
    ]

    message.forEach((user) => {
      it('deve exibir a mensagem ' + user.message, () => {
        cy.emptyFields(user)
      })
    })
  })


})