/**
 * Módosít egy adott teát.
 */
module.exports = () => {
  return function(req, res, next) {
    // Kivesszük a tea azonosítóját.
    const { teaid } = req.params

    // Ha nem szám, akkor akkor irányítsuk a login-ra. 
    if (Number.isNaN(teaid)) {
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


    // 
    console.log(`Módosított tea: ${ teaid }`)
    console.log('***********')
    return res.redirect('/tea/all')
  }
}