/**
 * Visszaadja az összes nem törölt teát.
 * @param {Object} models 
 * @returns {[]} Teák.
 */
module.exports = (models) => {
  return function(_req, res, _next) {
    const { teaModel } = models
    
    let allTeas = []
    teaModel.find({ "deleted": 0}, (err, teas) => {
      if (err || !teas) {
        res.send([])
      } 
      
      if (teas) {
        res.send(JSON.stringify(teas))
      }
    })
  } 
}

