/**
 * Bejelentkezés.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, next) {
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

    try {
      await userModel.findOne(
        {
          name: req.body.username, 
          password: req.body.password
        }).then((response) => {
          if (!response) {
            res.locals.error = 'Sikertelen bejelentkezés.'
            return next() 
          }

          req.session.usertoken = response._id
          req.session.save()

          return res.redirect('/seans/all')
        })
    } catch(err) {
      console.log(err)
      res.locals.error = 'Sikertelen bejelentkezés.'

      return next()
    }
  }
}