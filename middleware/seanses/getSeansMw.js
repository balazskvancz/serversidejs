/**
 * Megjelenít egy adott szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, next) {

    const seansId = req.params.seansid

    const seans = {
      seansId: seansId,
      date: '2022-03-01',
      teas: [
        { name: 'Tie Guan yin' },
        { name: 'Da Xue shan' },
      ]
    }

    res.locals.seans = seans
    next()
  }
}