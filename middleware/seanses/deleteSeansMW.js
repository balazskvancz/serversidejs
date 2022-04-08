/**
 * Töröl egy adott szeánsz-t.
 */
module.exports = () => {
  return function(req, res, next) {
    // Ki kell vennünk a szeánsz azonoítóját a paramból.
    const { seansid } = req.params

    if (Number.isNaN(seansid)) {
      return   
    }

    // Töröltté teszzük a szeánszot.

    console.log(`Törölt szeánsz: ${ seansid }`) 
    console.log('***********')
    
    return res.redirect('/seans/all')
  }
}