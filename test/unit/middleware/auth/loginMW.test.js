const { expect } = require('chai')
const loginMW = require('../../../../middleware/auth/loginMW')

const FAILED_LOGIN_TEXT = 'Sikertelen bejelentkezés.'

const RIGHT_REQUEST_DATA = {
  username: 'teszt',
  password: 'teszt'
}


describe('loginMW', () => {
  it('A MW hibát állít be, ha üres requestBody', async () => {
    const mw = loginMW({})

    const res = {
      locals: {}
    }

    await mw({
      body: {}
    }, 
    res, 
    () => {
      expect(res.locals).not.to.be.undefined
      expect(res.locals.error).to.be.equal(FAILED_LOGIN_TEXT)
    })
  })

  it('A MW hibát állít be, ha nincs username megadva', async () => {
    const mw = loginMW({})

    const res = {
      locals: {}
    }

    await mw({
      body: { username: ''}
    }, 
    res, 
    () => {
      expect(res.locals.error).not.to.be.undefined
      expect(res.locals.error).to.be.equal(FAILED_LOGIN_TEXT)
    })
  })

  it('A MW hibát állít be, ha nincs password megadva', async () => {
    const mw = loginMW({})

    const res = {
      locals: {}
    }

    await mw({
      body: { username: 'teszt', password: ''}
    }, 
    res, 
    () => {
      expect(res.locals.error).not.to.be.undefined
      expect(res.locals.error).to.be.equal(FAILED_LOGIN_TEXT)
    })
  })

  it('A MW adatbázis hibával elszáll', async () => {
    const userModel = {
      async findOne(_d) {
        throw new Error('oops.')
      }
    }

    const mockObj = { userModel }

    const mw = loginMW(mockObj)

    const res = {
      locals: {}
    }

    await mw({
      body: RIGHT_REQUEST_DATA
    }, 
    res, 
    () => {
      expect(res.locals.error).not.to.be.undefined
      expect(res.locals.error).to.be.equal(FAILED_LOGIN_TEXT)
    })
  })

  it('A MW hibát állít be ha nem található a user', async () => {
    const userModel = {
      async findOne(_d) {
        return null
      }
    }

    const mockObj = { userModel }

    const mw = loginMW(mockObj)

    const res = {
      locals: {}
    }

    await mw({
      body: RIGHT_REQUEST_DATA
    }, 
    res, 
    () => {
      expect(res.locals.error).not.to.be.undefined
      expect(res.locals.error).to.be.equal(FAILED_LOGIN_TEXT)
    })
  })

  it('A MW sikeresen bejelentkezteti a felhasználót', async () => {
    const mockId = 'randomId1231'
    const userModel = {
      async findOne(_d) {
        return { _id: mockId } 
      }
    }

    const mockObj = { userModel }

    const mw = loginMW(mockObj)

    const req ={
      body: RIGHT_REQUEST_DATA,
      session: {
        save() {}
      }
    }

    const res = {
      locals: {},
      redirect(url) {
        expect(url).to.be.equal('/seans/all')
      },
    }

    await mw(
    req, 
    res, 
    () => {
      expect(req.session.usertoken).to.be.equal(mockId)
    })
  })
})
