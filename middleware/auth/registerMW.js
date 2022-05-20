/**
 * Regisztráció.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, next) {
    // Szimpla validáció.
    const fields = [
      'username',
      'password',
      'password_repeat'
    ]

    fields.forEach((field) => {
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

    let alreadyExits = false

    await userModel.findOne(
      {'name': req.body.username}
    ).then((result) => {
      alreadyExits = result ? true : false 
    })


    if (alreadyExits) {
      res.locals.error = 'Ilyen nevű felhasználó már létezik.'

      return next()
    }
    
    
    // Létrehozzuk, az új egyedet.
    const newUser = new userModel()

    newUser.name     = req.body.username
    newUser.password = req.body.password

    try {
      await newUser.save()
    } catch (err) {
      console.log(err)

      res.locals.error = 'Hiba történt. Próbálja újra.'
      return next()
    }

    // Ha nem volt hiba, akkor átirányítás.
    return res.redirect('/')
  }
}
