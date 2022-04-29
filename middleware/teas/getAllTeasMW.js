/**
 * Megjeleníti az összes teát.
 * @param {Object} models Adatbázis modelleket tartalmazó object.
 */
module.exports = (models) => {
  return async function (_req, res, next) {

    const { teaModel } = models

    try {
      await teaModel.find({'deleted': 0})
      .then((teas) => {
        res.locals.teas = teas

        return next()
      })
    } catch(err) {
      return res.status(500).send('Ismeretlen hiba.')
    }
  }
}