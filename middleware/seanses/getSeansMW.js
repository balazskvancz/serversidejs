/**
 * Megjelenít egy adott szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, next) {
    const { seansid }    = req.params
    const { seansModel } = models

    if (typeof seansid === 'undefined') {
      return res.status(404).send('Nem található szeánsz.')
    }

    seansModel.aggregate([
      { $lookup: {
          from: 'teas',
          localField: "_teas", 
          foreignField: "_id",
          as: "teas"
        }
      }
    ], 
    (err, seanses) => {

      if (err || !seanses) {
        return res.status(500).send('Ismeretlen hiba.')
      }

      const selectedSeans = seanses.filter((seans) => {
        return seans._id == seansid && seans._owner == req.session.usertoken && seans.deleted === 0
      })

      if (selectedSeans.length === 1)  {
        res.locals.seans = selectedSeans[0]
        
        next()
      }else {
        res.redirect('/seans/all')
      }
      
    })
  }
}