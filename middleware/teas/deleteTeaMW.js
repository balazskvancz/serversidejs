/**
 * Töröl egy adott teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function (req, res, _next) {
    const { teaid } = req.params
    const { teaModel } = models

    if (typeof teaid === 'undefined') {
      return
    }

    const query = { "_id": teaid }

    // Van ilyen tea?
    teaModel.find(query, (err, tea) => {
      if (err | !tea) {
        return
      }
    })

    teaModel.update(
      query, 
      { $set: { "deleted": 1 }}, 
      (err) => {
        if (err) {
          console.log(err)
        }
      })

    return res.redirect('/tea/all')
  }
}