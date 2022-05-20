/**
 * Megjelenít egy adott teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function (req, res, next) {
    const { teaid } = req.params

    // Ha nem szám a teaid.
    if (typeof teaid === 'undefined') {
      return res.redirect('/')
    }

    const { teaModel } = models

    try {
      await teaModel.findOne({ '_id': teaid })
      .then((tea) => {
        if(!tea) {
          return res.status(404)
        }

        res.locals.tea = tea

        return next()
      })
    } catch(err) {
      // console.log(err) 

      res.status(500).send('Ismeretlen hiba.')
    }
    
  }
}