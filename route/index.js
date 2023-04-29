const express = require('express');
const router = express.Router();
const indexController = require('../controller/index')
router.get('/', indexController.login);                                 // RETURNS LOGIN PAGE  
router.get('/register', indexController.register);                      // RETURNS REGISTRATION PAGE     
router.use('/employee', require('./employee'));                         // REDIRECTS TO OTHER ROUTER
router.use('/review', require('./employee'));                           // REDIRECTS TO OTHER ROUTER


module.exports = router;