/**
 * Visszaadja az összes nem törölt teát.
 * @param {Object} models 
 * @returns {[]} Teák.
 */
module.exports = (models) => {
  return function(_req, res, _next) {
    const { teaModel } = models
    
    teaModel.find({ "deleted": 0}, (err, teas) => {
      if (err) {
        res.send([])
      }

      res.send(JSON.stringify(teas)) 
    })

    res.send([])
  }
}

