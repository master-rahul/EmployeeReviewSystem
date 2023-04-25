const express = require('express');
const router = express.Router();
const indexController = require('../controller/index')
router.get('/', indexController.login);
router.get('/register', indexController.register);
router.use('/employee', require('./employee'));

module.exports = router;