const res = require("express/lib/response")

/**
 * Megjeleníti az összes teát.
 */
module.exports = () => {
  return function (req, res, next) {

    // Mock Adat.
    const teas = [
      {
        id: 1, 
        createdAt: '2022-03-01',
        name: 'Yiwu GuShu #1'
      },
      {
        id: 2, 
        createdAt: '2022-03-04',
        name: 'DaXueShan 2019'
      },
      {
        id: 3, 
        createdAt: '2022-04-01',
        name: 'Milky Oolong'
      }
    ]

    res.locals.teas = teas
    next()
  }
}