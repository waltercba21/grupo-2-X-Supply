const express = require ('express');
const router = express.Router();
const usersController = require('../Controllers/usersController');

router.get ('/', usersController.login);

router.get ('/', usersController.register);

module.exports = router;