const { expect } = require('chai')
const addSeansMW = require('../../../../middleware/seanses/addSeansMW')

const mockSeansModel = {}

describe('addSeansMW', () => {

  it('A middlware hibát állít be, ha nincs date megadva', async () => {
    const mw = addSeansMW(mockSeansModel)
    const mockResponse = { locals: {}}
    const mockRequest = { body: {}}
    
    await mw(mockRequest, mockResponse, () => {
      expect(mockResponse.locals.error).not.to.be.undefined
      expect(mockResponse.locals.error).to.be.equal('Nincs dátum megadva.')
    })

  })

  it('A middlware hibát állít be, ha nincs date megadva', async () => {
    const mw = addSeansMW(mockSeansModel)
    const mockResponse = { locals: {}}
    const mockRequest = { body: {date: '' } }
    
    await mw(mockRequest, mockResponse, () => {
      expect(mockResponse.locals.error).not.to.be.undefined
      expect(mockResponse.locals.error).to.be.equal('Nincs dátum megadva.')
    })
  })

  it('A middlware mentési hibával elszáll', async () => {
    class mockSeansModel {
      save() {
        throw new Error('something went wrong...')
      }
    }

    const mockModels = { seansModel: mockSeansModel}
    const mw = addSeansMW(mockModels)
    const mockResponse = { locals: {}}
    const mockRequest = { body: {date: '2022-05-16'}, session: 'asddsa'}

    await mw(mockRequest, mockResponse, () => {
      expect(mockResponse.locals.error).not.to.be.undefined
      expect(mockResponse.locals.error).to.be.equal('Mentési hiba.')
      
    })
  })

  it('Sikeres adatbázis mentés esetén, meghívjuk a redirectet', async () => {
    class MockSeansModel {
      save() {}
    }

    const mockModels = { seansModel: MockSeansModel}

    const mw = addSeansMW(mockModels)

    const mockRequest = { body: { date: '2022-05-16', 'tea-asd': 1, 'tea-bdafa': 2}, session: { usertoken: 'token'}}

    const mockResponse = {
      redirect(uri) {
        expect(uri).to.be.equal('/seans/all')
      }
    }

    mw(mockRequest, mockResponse, () => {
      expect(mockResponse.locals.error).to.be.undefined
    }) 

  })
})