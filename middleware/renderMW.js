/**
 * Lerenderel egy adott view-t. 
 * @param {string} viewName A lerenderelendÅ‘ view neve.
 * @returns  
 */
module.exports = function(viewName) {
  return function(_req, res) {
    res.render(viewName)
  }
}
