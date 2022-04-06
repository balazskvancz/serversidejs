// CHANGELOG
//
// Az általam megírt specifikációhoz képest, annyi módosítást hoztam be, 
// hogy egyes műveletek, route-ok elérését, bejelentkezéshez kötöttem. 
// A bejelentkezés magával hozza a regisztrációt is.
//
// A helyzet még annyiban módosul, hogy minden user csak a saját szeánszait
// láthatja, módosítja és törölheti.
//
// (Remélem, ez nem probléma.)
// 

const auth            = require('../middleware/auth/authMW')
const login           = require('../middleware/auth/loginMW')
const register        = require('../middleware/auth/registerMW')

const addSeans        = require('../middleware/seanses/addSeansMW')
const allSeanses      = require('../middleware/seanses/getAllSeansesMW')
const deleteSeans     = require('../middleware/seanses/deleteSeansMW')
const editSeans       = require('../middleware/seanses/editSeansMW')
const getSeans        = require('../middleware/seanses/getSeansMw')

const addTea          = require('../middleware/teas/addTeaMW')
const allTeas         = require('../middleware/teas/getAllTeasMW')
const deleteTea       = require('../middleware/teas/deleteTeaMW')
const editTea         = require('../middleware/teas/editTeaMW')
const getTea          = require('../middleware/teas/getTeaMW')

const renderMW        = require('../middleware/renderMW')

// const authMW = require('../middleware/auth/authMW')

module.exports = function(app) {

  /**
   * Megjeleníti a regisztrációs nézetet.
   */
  app.get(
    '/register', 
    renderMW('register')
  )

  /**
   * Elmenti a regisztrációt.
   */
  app.post(
    '/register',
    register()
  )

  /**
   * Megjeleníti a bejelentkező nézetet.
   */
  app.get(
    '/',
    renderMW('login')
  )

  /**
   * Bejelentkezteti a user-t.
   */
  app.post(
    '/',
    login()
  )
  

  /* SZEÁNSZOK  */

  /**
   * Összes már felvett szeánsz megjelenítése.
   */
  app.get(
    '/seans/all',
    allSeanses(),
    auth(),
    renderMW('allSeanses')
  );

  /**
   * Megjeleníti az új szeánsz felvétele nézetet.
   */
  app.get(
    '/seans/new',
    auth(), 
    renderMW('newSeans')
  )

  /**
   * Új szeánsz egyed felvétele.
   */
  app.post(
    '/seans/new',
    addSeans(),
    auth()
  )

  /**
   * Megjeleníti egy adott szeánsz módosítása nézetet.
   */
  app.get(
    '/seans/:seansid/edit',
    getSeans(),
    auth(),
    renderMW('editSeans')
  )


  /**
   * Elmenti egy adott szeánsz módosításait.
   */
  app.post(
    '/seans/:seansid/edit',
    editSeans(),
    auth()
  )
  

  /**
   * Egy szeánsz törlése.
   */
  app.post(
    '/seans/:seansid/delete',
    deleteSeans(),
    auth()
  )

  /* TEÁK */

  /**
   * Megjeleníti az összes teát.
   */
  app.get(
    '/tea/all',
    allTeas(),
    auth()
  )

  /**
   * Megjeleníti egy adott tea adatait.
   */
  app.get(
    '/tea/:teaid',
    getTea(),
    auth()
  )

  /**
   * Megjeleníti egy új tea felvétele nézetet.
   */
  app.get(
    '/tea/new',
    auth()
  )

  /**
   * Felvesz egy új tea egyedet.
   */
  app.post(
    '/tea/new',
    addTea(),
    auth()
  )

  /**
   * Megjeleníti egy adott tea módosítási nézetét.
   */
  app.get(
    '/tea/:teaid/edit',
    getTea(),
    auth()
  )

  /**
   * Elmenti egy adott tea módosításait.
   */
  app.post(
    '/tea/:teaid/edit',
    editTea(),
    auth(),
  )

  /**
   * Töröl egy adott tea egyedet.
   */
  app.get(
    '/tea/:teaid/delete',
    deleteTea(),
    auth()
  )


}
