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
})