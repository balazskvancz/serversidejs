/**
 * Töröl egy adott szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, _next) {
    // Ki kell vennünk a szeánsz azonoítóját a paramból.
    const { seansid }    = req.params
    const { seansModel } = models

    seansModel.update(
      { '_id': seansid},
      { $set: { 'deleted': 1}},
      (err) => {
        if (err) {
          return res.status(500).send('Ismeretlen hiba.')
        }
      }
    )

    return res.redirect('/seans/all')
  }
}