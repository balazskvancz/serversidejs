/**
 * Authentikációs mw, amennyiben nincs session-ben usertoken, akkor belépésre irányítja át.
 * 
 * @returns 
 */
module.exports = () => {
  return function(req, res, next) {
   
    if (typeof req.session === 'undefined' 
    || typeof req.session.usertoken !== 'string') {
      return res.redirect('/')
    }
   
    // Ha minden ok, akkor továbbítsuk a requestet a láncban.
    next()
  }
}
