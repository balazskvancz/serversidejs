const { expect } = require('chai')
const getTeaMW = require('../../../../middleware/teas/getTeaMW')

describe('editTeaMW', () => {
  it('A MW /-re irányít, ha nincs teaid', async () => {
    const mw = getTeaMW({})

    await mw({
      params: {}
    }, 
    {
      redirect(url) {
        expect(url).to.be.equal('/')
      }
    }, () => {})
  }) 

  it('A MW hibát dob és 500-as hibakódot, ha DB error történt', async () => {
    const teaModel = {
      async findOne(_d) {
        throw new Error('something went wrong...')
      }
    }

    const mockObj = { teaModel }

    const mw = getTeaMW(mockObj)

    const res = {
      status(errorcode) {
        expect(errorcode).to.be.equal(500)
        return this
      },

      send(msg) {
        expect(msg).to.be.deep.equal('Ismeretlen hiba.')
      }
    }

    

    await mw({
      params: { teaid: '_id123' }
    }, 
    res, 
    () => {})
    
  })

  it('A MW 404-et dob, ha nincs ilyen tea, amit keresün', async () => {
   
    const teaModel = {
      async findOne (_d) {
        return null
      }
    }

    const mockObj = { teaModel }
    
    const mw = getTeaMW(mockObj)

    

    await mw({
      params: { teaid: '_id123'}
    }, 
    {
      status(errorcode) {
        expect(errorcode).to.be.equal(404)
      }
    }, () => {})
  })

  it('A mw lekérdezi a keresett tea-t és berakja a locals-ba', async () => {
    const teaModel = {
      async findOne (_d) {
        return { name: 'Teszt tea' }
      }
    }

    const mockObj = { teaModel }

    const mw = getTeaMW(mockObj)

    const mockRes = {
      locals: {}
    }

    await mw({
      params: {
        teaid: '_id123'
      }
    },
    mockRes,
    () => {
      expect(mockRes.locals).not.to.be.undefined
      expect(mockRes.locals.tea).to.be.deep.equal({ name: 'Teszt tea' })
    }
    )
  })
})
