/**
 * Módosít egy adott teát.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function(req, res, next) {
    // Kivesszük a tea azonosítóját.
    const { teaid } = req.params

    // Ha nem szám, akkor akkor irányítsuk a login-ra. 
    if (typeof teaid === 'undefined') {
      return res.redirect('/')
    }

    // Ha nincs megadva teanév vagy esetleg üres sztring, akkor is hiba.
    if (
      typeof req.body.tea_name !== 'string' || 
      req.body.tea_name.length === 0 
    ) {
      res.locals.error = 'Nincs név megadva.' 

      return next()
    }

    // Adatbázis művelet.
    const { teaModel } = models

    // Létezik ilyen egyed?
    teaModel.findOne(
      { "_id": teaid },
      (err, tea) => {
        if (err | !tea) {

          return
        }
      }
    )

    teaModel.update(
      { "_id": teaid}, 
      { $set: { "name": req.body.tea_name}}, 
      (err) => {
        if (err) {
          console.log(err)
        }
      }
    )
    
    return res.redirect('/tea/all')
  }
}