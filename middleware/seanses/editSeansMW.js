/**
 * Módosít egy adott szeász-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  const TEA_FIELD_PREFIX = 'tea-'
  
  return async function(req, res, _next) {
    const { seansid }    = req.params
    const { seansModel } = models
    if ( typeof seansid === 'undefined') {
      res.status(404).send('Nem található szeánsz.')

      return
    }

    // Hozzáaadjuk az összes újonann felvett teát.
    const fields = Object.keys(req.body)

    // Kiszedjük a teák azonosítóit.
    const teaIds = fields.reduce((acc, curr) => {
      if (!curr.includes(TEA_FIELD_PREFIX)) {
        return acc
      }
      
      const teaId = req.body[curr]

      if (typeof teaId === 'undefined') {
        return acc
      }

      acc.push(teaId)

      return acc
    }, [])

    // Jelenlegi teák.
    const currentlyAttachedTeas = res.locals.seans._teas.map((oId) => {
      return oId.toString()
    })

    // Jelenlegi és újonnan hozzáadott teák halmaza.
    const newAttachedTeas = Array.from(
      new Set([...currentlyAttachedTeas, ...teaIds])
    )

    try {
      await seansModel.update(
        { _id: seansid}, 
        { $set: { _teas: newAttachedTeas}})
    } catch(err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }

    res.redirect('/seans/all')
  }
}
