/**
 * Töröl egy adott szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, _next) {
    // Ki kell vennünk a szeánsz azonoítóját a paramból.
    const { seansid }    = req.params
    const { seansModel } = models

    try {
      await seansModel.update(
        { '_id': seansid},
        { $set: { 'deleted': 1}})
    } catch (err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }
     
    return res.redirect('/seans/all')
  }
}
