/**
 * Töröl egy adott teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function (req, res, _next) {
    const { teaid } = req.params
    const { teaModel } = models

    teaModel.update(
       { '_id': teaid }, 
      { $set: { 'deleted': 1 }}, 
      (err) => {
        if (err) {
          return res.status(500).send('Ismeretlen hiba.')
        }
      })

    return res.redirect('/tea/all')
  }
}