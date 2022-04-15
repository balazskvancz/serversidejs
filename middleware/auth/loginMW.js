/**
 * Bejelentkezés.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
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

    const { userModel } = models

    userModel.findOne(
      {
        name: req.body.username, 
        password: req.body.password
      },
      (err, user) => {
        if (err || !user) {
          res.locals.error = 'Sikertelen bejelentkezés.'

          return next() 
        }

        req.session.usertoken = user._id
        req.session.save()

        return res.redirect('/seans/all')
      }
    )
  }
}