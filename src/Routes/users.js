const express = require ('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware')
const usersController = require('../Controllers/usersController');
const registerValidation = require ('../middlewares/validateRegisterMiddleware');



//Formulario Login
router.get ('/login', usersController.login);

//Formulario Registro
router.get ('/register', usersController.register);

// Procesamiento del formulario de registro

router.post('/register', upload.single("imagenUsuario"), registerValidation, usersController.processRegister)


module.exports = router;