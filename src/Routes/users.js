const express = require ('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware')
const usersController = require('../Controllers/usersController');
const registerValidation = require ('../middlewares/validateRegisterMiddleware');



//Formulario Login
router.get ('/login', usersController.login);

//Procesamiento Formulario Login
router.post ('/login',registerValidation, usersController.loginProcess);

//Formulario Registro
router.get ('/register', usersController.register);

// Procesamiento del formulario de registro

router.post('/register', upload.single("imagenUsuario"), registerValidation, usersController.processRegister)

//Perfil del Usuario

router.get ('/profile', usersController.profile);



module.exports = router;