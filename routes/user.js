const express = require('express');
const router = express.Router();
const auth = require('../auth.js');
const userController = require('../controllers/userController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/details', auth, userController.getUserDetails);

module.exports = router;