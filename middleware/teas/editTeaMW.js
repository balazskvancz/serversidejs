/**
 * Módosít egy adott teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, next) {
    // Kivesszük a tea azonosítóját.
    const { teaid } = req.params

    // Ha nem szám, akkor akkor irányítsuk a login-ra. 
    if (typeof teaid === 'undefined') {
      return res.redirect('/')
    }

    // Ha nincs megadva teanév vagy esetleg üres sztring, akkor is hiba.
    if (
      typeof req.body.tea_name !== 'string' || 
      req.body.tea_name.length === 0 
    ) {
      res.locals.error = 'Nincs név megadva.' 

      return next()
    }

    // Adatbázis művelet.
    const { teaModel } = models

    // Létezik ilyen tea?
    let existingTea = null 
    try {
      await teaModel.findOne(
        { '_id': teaid }
      ).then((tea) => {
        if (!tea) {
          return res.redirect('/tea/all')
        }

        existingTea = tea
      })
    } catch(err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }

    // Mielőtt updateljük, meg kell vizsgálni, hogy nem lesz e névütközés.
    let isOkToUpdate = true 
    try {
      await teaModel.findOne(
        { 'name': req.body.tea_name }
      ).then((nameQueryTea) => {
        // Ha már van ilyen tea, akkor nem szabad ilyenre updatelni.
        isOkToUpdate = nameQueryTea ? false : true 
      })
    } catch(err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }

    if (!isOkToUpdate) {
      res.locals.error = 'Ilyen névvel már létezik tea.'

      return next()
    }

    try {
      await teaModel.update(
      { '_id': teaid}, 
      { $set: { 'name': req.body.tea_name}})
    } catch(err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }
              
    return res.redirect('/tea/all')
  }
}
