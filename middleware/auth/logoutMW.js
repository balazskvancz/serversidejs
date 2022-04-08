/**
 * Kijelentkezteti a felhasználót.
 * 
 * @returns 
 */
module.exports = () => {
  return function(req, res, next) {
      req.session.destroy(err => {
          res.redirect('/');
      });
  };

};