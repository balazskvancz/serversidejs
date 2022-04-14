
/**
 * Megjeleníti az összes felvett szeánszot.
 * @param {Object} models Adatbázis modelleket tartalmzó object.
 */
module.exports = (models) => {
  return function (_req, res, next) {

    const seanses = [
      { seansId: 1, 
        date: '2022-03-21', 
        teas: [
          { name: 'Yiwu #1' },
          { name: 'Da xue shn' },
          { name: 'Milky Oolong' },
      ]},
      { seansId: 2, 
        date: '2022-04-21',
        teas: [
          { name: 'Milky Oolong' }
      ]}
    ]

    res.locals.seanses = seanses
    next()
  }
}