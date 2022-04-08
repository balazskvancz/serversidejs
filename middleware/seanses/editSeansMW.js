/**
 * Módosít egy adott szeász-t.
 */
module.exports = () => {
  const TEA_FIELD_PREFIX = 'tea-'
  
  return function(req, res, next) {

    const { seansid } = req.params

    // Ha nem szám megadott seánsz azonosító,
    // akkor legyen 404
    if (Number.isNaN(seansid)) {
      

    }

    // Lecheckoljuk, hogy létezik e egyáltalán ilyen szeánsz.


    // Hozzáaadjuk az összes újonann felvett teát.
    const fields = Object.keys(req.body)

    // Kiszedjük a teák azonosítóit.
    const teaIds = fields.reduce((acc, curr) => {
      if (!curr.includes(TEA_FIELD_PREFIX)) {
        return acc
      }
      
      const teaId = req.body[curr]

      if (Number.isNaN(teaId)) {
        return acc
      }

      acc.push(teaId)

      return acc
    }, [])

    // Mentjük adatbázisba az újonann felvett teákat.

    console.log(`Módosított szeánsz: ${ seansid }, új teák: `)
    teaIds.forEach((teaId) => {
      console.log(`Tea azonosító: ${ teaId }`)
    })
    console.log('***********')
   
    res.redirect('/seans/all')
  }
}