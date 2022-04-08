/**
 * Felvesz egy új teát.
 */
module.exports = () => {
  return function(req, res, next) {
    // Egyelőre basic validáció.
    if (
      typeof req.body.tea_name !== 'string' || 
      req.body.tea_name.length === 0
    ) {
      res.locals.error = 'Nincs név megadva.'

      return next()
    }

    // Itt megtörténik a név duplikációra való adatbázis keresés.

    // Itt beszúrjuk az adatbázisba.

    console.log('Sikeres teafelvétel.')
    console.log('***********')

    return res.redirect('/tea/all')
  }
}