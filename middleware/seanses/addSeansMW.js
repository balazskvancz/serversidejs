/**
 * Felvesz egy új szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  const TEA_FIELD_PREFIX = 'tea-'

  return async function(req, res, next) {
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

    const { seansModel } = models

    const newSeans = new seansModel()
    newSeans.date   = req.body.date
    newSeans._owner = req.session.usertoken
    newSeans._teas  = teaIds

    try {
     await newSeans.save()
    } catch (err) {
      res.locals.error = 'Mentési hiba.'

      return next()
    }

    res.redirect('/seans/all')
  }
}
