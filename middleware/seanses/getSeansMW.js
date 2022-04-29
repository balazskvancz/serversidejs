/**
 * Megjelenít egy adott szeánsz-t.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, next) {
    const { seansid }    = req.params
    const { seansModel } = models

    if (typeof seansid === 'undefined') {
      return res.status(404).send('Nem található szeánsz.')
    }


    try {
      await seansModel.aggregate([
        { $lookup: {
          from: 'teas',
          localField: "_teas", 
          foreignField: "_id",
          as: "teas"
        }
      }
    ]).then((seanses) => {
        const selectedSeans = seanses.filter((seans) => {
          return seans._id == seansid && seans._owner == req.session.usertoken && seans.deleted === 0
        })

      if (selectedSeans.length === 1)  {
        res.locals.seans = selectedSeans[0]
        
        next()
      }else {
        return res.redirect('/seans/all')
      }
    })
 
    } catch (err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }
  }
}