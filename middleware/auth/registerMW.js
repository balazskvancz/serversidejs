/**
 * Regisztráció.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, next) {
    // Szimpla validáció.
    const fields = [
      'username',
      'password',
      'password_repeat'
    ]

    fields.forEach((field) => {
      console.log(typeof req.body[field])
      if (typeof req.body[field] === 'undefined' ||
          req.body[field].length === 0 ){
        res.locals.error = 'Az összes mező kitöltése kötelező.'
        
        return next()
      }
    })

    // Ha nem egyeznek meg a jelszavak.
    if (req.body.password !== req.body.password_repeat) {
      res.locals.error = 'Nem egyeznek a jelszavak.'

      return next()
    }
    

    const { userModel } = models

    const newUser = new userModel()

    newUser.name     = req.body.username
    newUser.password = req.body.password

    newUser.save((err) => {
      if (err) {
        // Itt valami hibakezelés.
      }

    })

    // Adatbázis mentés.
    console.log('Sikeres resgisztráció.')

    return res.redirect('/')
  }
}