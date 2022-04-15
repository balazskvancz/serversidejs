const mongoose = require('mongoose')

/**
 * Töröl egy adott teát egy adott szeánszból.
 * @param {Object} models 
 * @returns 
 */
module.exports = (models) => {
  return function (req, res, next) {
    const { seansModel } = models
    const { seansid, teaid } = req.params

    if (
      typeof seansid === 'undefined' || 
      typeof teaid === 'undefined'
    ) {
      return res.status(404).send('Helytelen paraméter.')
    }

    const newTeasArray = res.locals.seans._teas.filter((teaIds) => {
      return teaIds.toString() != teaid
    })

    seansModel.update(
      { _id: seansid}, 
      { $set: { _teas: newTeasArray}}, 
      (err, val) => {
        // Hiba,
        if (err) {
          console.log(err)
        }

        // Ekkor minden ok!
        const url = `/seans/${ seansid }/edit`
        return res.redirect(url)
      }
    )
     
  }
}