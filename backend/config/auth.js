module.exports = {
  //po probie wejscia na /dashboard nie będąc zalogowanym. Przekierowuje na /users/login
  ensureAuthenticated: function(req,res,next){
      if(req.isAuthenticated()){
        return next()
      }
      req.flash('error_msg', 'Please log in to view this resource')
      res.redirect('/users/login')
  },

    //po probie wejscia na /users/login lub /users/register będąc zalogowanym . Przekierowuje na /dashboard
    checkNotAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/dashboard')
      }
      next()
    },
}