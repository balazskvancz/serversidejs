/**
 * Megjelenít egy adott teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function (req, res, next) {
    const { teaid } = req.params

    // Ha nem szám a teaid.
    if (typeof teaid === 'undefined') {
      return 
    }

    const { teaModel } = models

    teaModel.findOne({
      "_id": teaid
    }, (err, tea) => {
      if (err) {
        console.log(err)
      }

      res.locals.tea = tea
      console.log(tea)
      return next()
    })
  }
}