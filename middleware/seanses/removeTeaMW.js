const mongoose = require('mongoose')

/**
 * Töröl egy adott teát egy adott szeánszból.
 * @param {Object} models 
 * @returns 
 */
module.exports = (models) => {
  return async function (req, res, _next) {
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

    try {
      await seansModel.update(
        { _id: seansid}, 
        { $set: { _teas: newTeasArray}}) 
    } catch (err) {
      console.log(err)

      return res.status(500).send('Ismeretlen hiba.')
    }

    // Ha ide eljutunk, akkor sikeres volt.
    const url = `/seans/${ seansid }/edit`
    return res.redirect(url)
  }
}