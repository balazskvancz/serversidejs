/**
 * Felvesz egy új teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, next) {
    // Egyelőre basic validáció.
    if (
      typeof req.body.tea_name !== 'string' || 
      req.body.tea_name.length === 0
    ) {
      res.locals.error = 'Nincs név megadva.'

      return next()
    }

    const currentDate = new Date()

    const month = currentDate.getMonth() + 1
    const monthStr = month < 10 ? `0${ month }` : month
    const createdAt = `${ currentDate.getFullYear() }-${ monthStr }-${ currentDate.getDate() }`

    const { teaModel } = models

    teaModel.findOne(
      {
        'name': req.body.tea_name,
      }, 
      (_err, tea) => {
        if (tea) {
          res.locals.error = 'Ilyen névvel már létezik tea.' 

          return next()
        }
       }
      )

    

    const newTea = new teaModel()

    newTea.name = req.body.tea_name
    newTea.createdAt = createdAt

    newTea.save((err) => {
      if (err) {
        return res.status(500).send('Ismeretlen hiba.')
      }
    })

    
    return res.redirect('/tea/all')
  }
}