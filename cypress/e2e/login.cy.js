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

  it('não deve logar com instagram fora do padrão', () => {
    const user={
      instagram:"evertonsouza",
      password:"pwd123"
    }
    
    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')

  })

  it('deve retornar mensagem de obrigatoriedade de senha', () => {   
    const user={
      instagram:"evertonsouza"
    } 
    cy.passwordEmpty(user)
    cy.modalHaveText('Por favor, informe a sua senha secreta!')

  })

  it('deve retornar mensagem de obrigatoriedade de código do Instagram', () => {   
    const user={
      password:"pwd123"
    } 
    cy.instagramEmpty(user)
    cy.modalHaveText('Por favor, informe o seu código do Instagram!')

  })

  it('deve retornar mensagem informe suas credenciais!', () => {    
    cy.loginFieldsEmpty()
    cy.modalHaveText('Por favor, informe suas credenciais!')

  })

})