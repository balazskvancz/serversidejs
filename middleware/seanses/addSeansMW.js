/**
 * Felvesz egy új szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  const TEA_FIELD_PREFIX = 'tea-'

  return function(req, res, next) {
    // Egyszerűen csak dátumra vizsgálunk.
    if (typeof req.body.date !== 'string' || req.body.date.length === 0) {
      res.locals.error = 'Nincs dátum megadva.'

      return next()
    }

    // Kivesszük az összes kulcsot a requestbody-ból.
    const fields = Object.keys(req.body)

    // Ezeken végigiterálva tudjunk kivenni a felvett teákat.
    // Minden olyan selection ami teára vonatkozik `tea-`-val fog kezdődni.
    const teaIds = fields.reduce((acc, curr) => {
      if (!curr.includes(TEA_FIELD_PREFIX)) {
        return acc
      }

      const teaId = req.body[curr]

      if (Number.isNaN(teaId)) {
        return acc
      }

      acc.push(teaId)

      return acc
    },[])
   
    // Adatbázis mentés.
    console.log('Új szeánsz felvéve, teák: ')
    teaIds.forEach((teaId) => {
      console.log(`Tea azonosító: ${ teaId }`)
    })
    console.log('***********')

    res.redirect('/seans/all')
  }
}