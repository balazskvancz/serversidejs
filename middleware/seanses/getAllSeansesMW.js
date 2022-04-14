
/**
 * Megjeleníti az összes felvett szeánszot.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function (req, res, next) {
    const { seansModel } = models

    seansModel.find(
      { "_owner": req.session.usertoken},
      (err, seanses) => {
        if (err || !seanses) {
          console.log(err)
        }

        if (seanses) {
          res.locals.seanses = seanses

          next()
        }
      }
    )

  }
}