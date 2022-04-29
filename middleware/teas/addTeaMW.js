/**
 * Felvesz egy új teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, next) {
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

    let alreadyExits = false

    try {
      await teaModel.findOne(
        { 'name': req.body.tea_name }
      ).then((response) => {
        alreadyExits = response ? true : false
      })
    }catch (err) {
      console.log(err)  
      res.locals.error = 'Adatbázis hiba.'
      return next()
    }
   
    if (alreadyExits) {
      res.locals.error = 'Ilyen névvel már létezik tea.'

      return next()
    }
    

    const newTea = new teaModel()

    newTea.name = req.body.tea_name
    newTea.createdAt = createdAt

    try {
      await newTea.save()
    }catch (err) {
      console.log(err)

      res.locals.error = 'Adatbázis hiba.'
      return next()
    }
    
    return res.redirect('/tea/all')
  }
}