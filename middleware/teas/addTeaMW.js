/**
 * Felvesz egy új teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return async function(req, res, next) {
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

    let existingTea = null
    try {
      await teaModel.findOne(
        { 'name': req.body.tea_name }
      ).then((tea) => {
        existingTea = tea
      })
    }catch (err) {
      console.log(err)  
      res.locals.error = 'Adatbázis hiba.'
      return next()
    }
   
    // Ha létezik ilyen tea, akkor hibát kell dobnunk, kivéve,
    // ha egy olyan tea nevét szeretnék felvenni, ami törölt.
    // Abban az esetben egyszerűen csak vissza kell állítani.
    if (existingTea) {
      if (existingTea.deleted === 0) {
        res.locals.error = 'Ilyen névvel már létezik tea.'

        return next()
      }

      // UPDATE
      try {
        await teaModel.update(
          { 'name': existingTea.name },
          { $set: { 'deleted': 0 }})
      }catch(err) {
        console.log(err)

        return res.status(500).send('Ismeretlen hiba.')
      }

      return res.redirect('/tea/all')
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
