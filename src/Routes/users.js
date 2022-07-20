const express = require ('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware')
const usersController = require('../Controllers/usersController');
const validation = require ('../middlewares/validateRegisterMiddleware');

//Formulario Login 
router.get ('/login', usersController.login);

//Procesamiento Formulario Login
router.post ('/login', usersController.loginProcess);

//Formulario Registro
router.get ('/register', usersController.register);

// Procesamiento del formulario de registro
router.post('/register', upload.single("image"), validation, usersController.processRegister)

//Perfil del Usuario
router.get ('/userProfile/:id', usersController.profile);

//Listar Usuarios
router.get('/', usersController.list)

//Editar Usuarios
/* router.get('/editUser/:id', usersController.editUser);
router.put('/editUser/:id', upload.single("imagenUsuario"), usersController.modifUser) */
 
module.exports = router;