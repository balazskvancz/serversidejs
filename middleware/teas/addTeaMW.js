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

    const month = currentDate.getMonth + 1
    const monthStr = month < 10 ? `0${ month }` : month
    const createdAt = `${ currentDate.getFullYear() }-${ monthStr }-${ currentDate.getDate() }`

    const { teaModel } = models

    teaModel.findOne(
      {
        "name": req.body.tea_name,
      }, 
      (err, tea) => {

        if (err) {
          console.log(err)
        }

        if (tea) {
          console.log('Már van ilyen tea.!')

          return
        }
      }
    )

    const newTea = new teaModel()

    newTea.name = req.body.tea_name
    newTea.createdAt = createdAt

    newTea.save((err) => {
      if (err) {
        console.log(err)
      }
    })

    
    return res.redirect('/tea/all')
  }
}