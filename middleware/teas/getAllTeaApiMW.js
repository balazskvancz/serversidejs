/**
 * Visszaadja az összes nem törölt teát.
 * @param {Object} models 
 * @returns {[]} Teák.
 */
module.exports = (models) => {
  return async function(_req, res, _next) {
    const { teaModel } = models
    
    try {
      await teaModel.find({ 'deleted': 0})
      .then((teas) => {
        res.send(JSON.stringify(teas))
      })
    } catch(err) {
      console.log(err)

      res.send(JSON.stringify([])) 
    }
  } 
}
