const res = require("express/lib/response")

/**
 * Megjeleníti az összes teát.
 * @param {Object} models Adatbázis modelleket tartalmazó object.
 */
module.exports = (models) => {
  return function (_req, res, next) {

    const { teaModel } = models

    teaModel.find({"deleted": 0}, (err, allTeas) => {
      if (err) {
        return
      }

      res.locals.teas = allTeas
      return next()
    }) 
  }
}