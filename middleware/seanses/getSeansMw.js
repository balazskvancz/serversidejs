/**
 * Megjelenít egy adott szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, next) {
    const seansId        = req.params.seansid
    const { seansModel } = models

    seansModel.find(
      { "_id": seansId, "_owner": req.session.usertoken},
      (err, seans) => {
        if (err || !seans) {
          console.log(err)
        }

        if (seans) {
          res.locals.seans = seans

          next()
        }
      }
    )

  }
}