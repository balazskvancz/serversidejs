
/**
 * Megjeleníti az összes felvett szeánszot.
 */
module.exports = () => {
  return function (req, res, next) {

    const seanses = [
      { seansId: 1, 
        date: '2022-03-21', 
        teas: [
          { name: 'Valami1' },
          { name: 'Valami2' },
          { name: 'Valami3' },
      ]},
      { seansId: 2, 
        date: '2022-04-21',
        teas: [
          { name: 'VALMI' }
      ]}
    ]

    res.locals.seanses = seanses
    next()
  }
}