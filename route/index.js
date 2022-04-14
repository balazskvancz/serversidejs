const auth            = require('../middleware/auth/authMW')
const login           = require('../middleware/auth/loginMW')
const register        = require('../middleware/auth/registerMW')
const logout          = require('../middleware/auth/logoutMW')

const addSeans        = require('../middleware/seanses/addSeansMW')
const allSeanses      = require('../middleware/seanses/getAllSeansesMW')
const deleteSeans     = require('../middleware/seanses/deleteSeansMW')
const editSeans       = require('../middleware/seanses/editSeansMW')
const getSeans        = require('../middleware/seanses/getSeansMw')

const addTea          = require('../middleware/teas/addTeaMW')
const allTeas         = require('../middleware/teas/getAllTeasMW')
const allTeaApi       = require('../middleware/teas/getAllTeaApiMW')
const deleteTea       = require('../middleware/teas/deleteTeaMW')
const editTea         = require('../middleware/teas/editTeaMW')
const getTea          = require('../middleware/teas/getTeaMW')

const renderMW        = require('../middleware/renderMW')

const teaModel        = require('../models/tea')
const seansModel      = require('../models/seans')
const userModel       = require('../models/user')

const models = {
  teaModel, 
  seansModel,
  userModel 
}

module.exports = (app) => {

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
    register(models),
    renderMW('register')
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
    '/login',
    login(models),
    renderMW('login')
  )

  /**
   * Kijelentkezteti a felhasználót.
   */
  app.get(
    '/logout', 
    logout()
  )
  

  /* SZEÁNSZOK  */

  /**
   * Összes már felvett szeánsz megjelenítése.
   */
  app.get(
    '/seans/all',
    auth(),
    allSeanses(models),
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
    auth(),
    addSeans(models),
    renderMW('newSeans')
  )

  /**
   * Megjeleníti egy adott szeánsz módosítása nézetet.
   */
  app.get(
    '/seans/:seansid/edit',
    auth(),
    getSeans(models),
    renderMW('editSeans')
  )


  /**
   * Elmenti egy adott szeánsz módosításait.
   */
  app.post(
    '/seans/:seansid/edit',
    auth(),
    editSeans(models),
  )
  

  /**
   * Egy szeánsz törlése.
   */
  app.get(
    '/seans/:seansid/delete',
    auth(),
    deleteSeans(),
  )

  /* TEÁK */

  /**
   * Megjeleníti az összes teát.
   */
  app.get(
    '/tea/all',
    auth(),
    allTeas(models),
    renderMW('allTeas')
  )

  /**
   * Megjeleníti egy új tea felvétele nézetet.
   */
  app.get(
    '/tea/new',
    auth(),
    renderMW('newTea') 
  )

  /**
   * Felvesz egy új tea egyedet.
   */
  app.post(
    '/tea/new',
    auth(),
    addTea(models),
    renderMW('newTea')
  )

  /**
   * Megjeleníti egy adott tea módosítási nézetét.
   */
  app.get(
    '/tea/:teaid/edit',
    auth(),
    getTea(models),
    renderMW('editTea')
  )

  /**
   * Elmenti egy adott tea módosításait.
   */
  app.post(
    '/tea/:teaid/edit',
    auth(),
    editTea(models),
    getTea(models),
    renderMW('editTea')
  )

  /**
   * Töröl egy adott tea egyedet.
   */
  app.get(
    '/tea/:teaid/delete',
    auth(),
    deleteTea(),
  )

  /* API CALLS */
  app.get(
    '/api/tea/all',
    allTeaApi(models)
  )
}
