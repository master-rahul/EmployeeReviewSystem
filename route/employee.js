const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee')
const passport = require('passport')

router.post('/add', employeeController.add);                                                            // FOR ADDING  EMPLOYEE FORM GOOGLE LOGIN OR REGISTRATION PAGE
router.post('/createSession', passport.authenticate('local', { failureRedirect:'/'}),employeeController.createSession);         // FOR LOGIN VIA USERNAME AND PASSWORD
router.get('/destroySession', employeeController.destroySession);                                       // FOR DELETEING/ TERMINATING THE SESSION
router.get('/home', passport.checkEmployee ,employeeController.home);                                   // RETURNS EMPLOYEE HOMEPAGE
router.get('/admin', passport.checkAdmin, employeeController.admin);                                    // RETURNS ADMIN HOMEPAGE
router.get('/employeeView', passport.checkAdmin, employeeController.employeeView);                      // RETURNS EMPLOYEE LIST IN ADMIN PORTAL
router.get('/remove/:id', passport.checkAdmin, employeeController.remove);                              // ALLOWS ADMIN TO REMOVE OTHER EMPLOYEE 
router.get('/setAdmin/:id', passport.checkAdmin, employeeController.setAdmin);                          // ALLOWS ADMIN TO MAKE OTHER EMPLOYEE ADMIN
router.post('/addReview', passport.checkEmployee, employeeController.addReview);                        // ALLOWS EMPLOYEE TO COMPLETED THE PENDING REVIEW
router.get('/employeeReview', passport.checkAdmin, employeeController.employeeReview);                  // DISPLAYS ALL PENDING AND COMPLETED REVIEWS
router.post('/edit', passport.checkAdmin, employeeController.reviewEdit);                               // ALLOWS ADMIN TO EDIT PENDING REVIEW
router.get('/delete/:id/:idd', passport.checkAdmin, employeeController.reviewDelete);                   // ALLOWS ADMIN TO DELETE PENDING REVIEW
router.post('/addRev', passport.checkAdmin, employeeController.reviewAdd);                              // ALLOWS ADMIN TO ASSING EMPLOYEE REVIEW
router.post('/addEmployee', passport.checkAdmin, employeeController.addEmployee);                       // ALLOWS ADMIN TO ADD EMPLOYEE FROM ADMIN PORTAL
router.post('/editEmployee', passport.checkAdmin, employeeController.employeeEdit);                     // ALLOWS ADMIN TO EDIT EMPLOYEE INFORMATION
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));           // AUTHENTICATES GOOGLE LOGIN
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), employeeController.createSession1);  // CREATES SESSION FOR GOOGLE LOGIN


module.exports = router;