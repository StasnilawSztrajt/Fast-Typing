const express = require('express');
const app = express()
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

const { DashboardActions } = require('../actions/dashboardActions');

// ścieżki do poszczególnych rzeczy
router.get('/dashboard',       ensureAuthenticated,     DashboardActions.getInfoUser);
router.get('/dashboard.json',                           DashboardActions.getInfoUserJson);
router.get('/dashboard/:id' ,                           DashboardActions.getInfoUserJsonById);
router.put('/dashboard/:id' ,                           DashboardActions.putInfoUserJsonById);



module.exports = {
    router,

};
