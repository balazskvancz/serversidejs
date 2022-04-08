/**
 * Bejelentkezés.
 */
module.exports = () => {
  return function(req, res, next) {
    // Egyelőre, annyit csinálunk, hogy ha nem 
    // ad meg semmit a felashználó, akkor error.
    if (
      typeof req.body.username !== 'string' || 
      typeof req.body.password !== 'string' || 
      req.body.username.length === 0 || 
      req.body.password.length === 0
    ) {
      res.locals.error = "Sikertelen bejelentkezés."

      return next()
    }

    // Beállítjuk a usertokent a megadott user-name.
    req.session.usertoken = req.body.username
    req.session.save()
  
    return res.redirect('/seans/all')
  }
}