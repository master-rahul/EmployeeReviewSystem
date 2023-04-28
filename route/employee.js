const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee')
const passport = require('../config/passport_local_strategy')

router.post('/add', employeeController.add);
router.post('/createSession', passport.authenticate('local', { failureRedirect:'/'}),employeeController.createSession);
router.get('/destroySession', employeeController.destroySession);
router.get('/home', passport.checkEmployee ,employeeController.home);
router.get('/admin', passport.checkAdmin, employeeController.admin);
router.get('/employeeView', passport.checkAdmin, employeeController.employeeView);
router.get('/remove/:id', passport.checkAdmin, employeeController.remove);
router.get('/setAdmin/:id', passport.checkAdmin, employeeController.setAdmin);
router.post('/addReview', passport.checkAdmin, employeeController.addReview);
router.get('/employeeReview', passport.checkAdmin, employeeController.employeeReview);
router.post('/edit', passport.checkAdmin, employeeController.reviewEdit);
router.get('/delete/:id/:idd', passport.checkAdmin, employeeController.reviewDelete);
router.post('/addRev', passport.checkAdmin, employeeController.reviewAdd);


module.exports = router;