const express = require('express');
const router = express.Router();
const { checkNotAuthenticated } = require('../config/auth')

const UserActions = require('../actions/userActions');

// ścieżki do poszczególnych rzeczy
router.get('/login',          checkNotAuthenticated, (req, res) =>{ res.render('login', {}) })
router.get('/register',       checkNotAuthenticated,(req,res) =>{ res.render('register', {})})
router.post('/register',      UserActions.saveUser)
router.post('/login',         UserActions.checkUser)
router.get('/logout',         UserActions.logout)
router.get('/topPlayers',     UserActions.getTop100User)


module.exports = {
  router,
}
