/**
 * Lerenderel egy adott view-t. 
 * @param {string} viewName A lerenderelendő view neve.
 * @returns  
 */
module.exports = function(viewName) {
  return function(_req, res) {
    res.render(viewName)
  }
}
