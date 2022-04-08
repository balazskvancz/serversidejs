/**
 * Megjelenít egy adott teát.
 */
module.exports = () => {
  return function (req, res, next) {
    const { teaid } = req.params

    // Ha nem szám a teaid.
    if (Number.isNaN(teaid)) {

    }

    // Mock Adat.
    const tea = {
      id: teaid,
      name: 'Yiwu GuShu'
    }

    res.locals.tea = tea

    return next()
  }
}