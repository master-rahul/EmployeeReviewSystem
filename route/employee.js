const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee')
const passport = require('../config/passport_local_strategy')

router.post('/add', employeeController.add);
router.post('/createSession', passport.authenticate('local', { failureRedirect:'/'}),employeeController.createSession);
router.get('/destroySession', employeeController.destroySession);
router.get('/home', passport.checkAuthentication ,employeeController.home);
router.get('/admin', passport.checkAuthentication, employeeController.admin);

module.exports = router;