/**
 * Töröl egy adott teát.
 */
module.exports = () => {
  return function (req, res, _next) {
    const { teaid } = req.params
    
    if (Number.isNaN(teaid)) {

    }

    // Töröltté tesszük.

    console.log(`Törölt tea: ${ teaid }`)
    console.log('***********')
    return res.redirect('/tea/all')
  }
}