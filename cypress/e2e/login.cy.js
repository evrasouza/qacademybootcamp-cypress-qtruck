import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe('login', () => {
  it('deve logar com sucesso', () => {
    const user = {
      name: 'Everton',
      instagram: '@evertonsouza',
      password: 'pwd123'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    mapPage.loggedUser(user.name)
  })

  it('nao deve logar com senha invalida', () => {
    const user = {
      instagram: '@evertonsouza',
      password: 'abc123'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })

  it('nao deve logar com instagram inexistente', () => {
    const user = {
      instagram: '@souzaeverton',
      password: 'pwd123'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Credenciais inválidas, tente novamente!')
  })

  it('instagram deve ser obrigatório', () => {
    const user = {
      instagram: "evertonsouza"
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')
  })

  it('senha deve ser obrigatória', () => {
    const user = {
      password: "pwd123"
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')
  })

  it('todos os campos devem ser obrigatórios', () => {

    loginPage.go()
    loginPage.form({})
    loginPage.submit()

    loginPage.modal.haveText('Por favor, informe suas credenciais!')
  })
})