const ObjectId = require('mongodb').ObjectId
/**
 * Megjeleníti az összes felvett szeánszot.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function (req, res, next) {
    const { seansModel } = models

    seansModel.aggregate([
      { $match: {
        $and: [
          { "deleted": 0 },
          { "_owner": ObjectId(req.session.usertoken)} 
        ]
      }},
      { $lookup: {
        from: 'teas',
        localField: "_teas", 
        foreignField: "_id",
        as: "teas"
      }}
    ], 
    (err, seanses) => {
      if (err) {
        return res.status(500).send('Ismeretlen hiba.')
      }

      res.locals.seanses = seanses

      next()
 
    })
  }
}
