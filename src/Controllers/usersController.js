const bcryptjs = require ('bcryptjs');
const {validationResult} = require ('express-validator');
const User = require ('../../models/User');

const usersController = {
   
   register: (req, res) => {
      res.render ('./users/register') 
 },
   processRegister: (req,res) =>{
   const resultValidation = validationResult(req);
   console.log(resultValidation);
   
   if (resultValidation.errors.length > 0){
      return res.render ('./users/register', {
         errors: resultValidation.mapped (),
         oldData : req.body
          });
      
   } //Este metodo permite que no se registren dos veces con el mismo email.
   let userInDB = User.findByField ('email', req.body.email);
   if (userInDB){ 
      return res.send ('./users/register',{
         errors: {
            email: {
               msg: 'Este mail ya esta registrado'
            }
         },
         oldData: req.body 
      });
      
   }
   

   let userToCreate = {
      ... req.body,
      password : bcryptjs.hashSync(req.body.password,10),
      imagenUsuario: req.file.filename
   }
   let userCreated = User.create(userToCreate);
   res.redirect('login');
  },
   
   login: (req, res) => {
      res.render ('./users/login')
 },

   loginProcess: (req,res) => {
      //Buscar al usuario
      let userToLogin = User.findByField ('email', req.body.email);
      
      if(userToLogin){
         
         let isOkThePassword = bcryptjs.compareSync (req.password, userToLogin.password);
         if (isOkThePassword){
            //Con este metodo borramos la contraseña cada vez que el usuario quiera volver a ingresar (Por Seguridad)
            delete userToLogin.password;
            //Con este metodo guardamos el usuario en SESSION;
            req.session.userLogged = userToLogin;
            return  res.redirect('userProfile');
       }
       return res.render ( './users/login', {
          errors: {
             email:{
                msg: 'Las credenciales son invalidas'
             }
          }
       })
      } 
      //Si no encuentra el mail registrado utiliza este metodo
      return res.render ('./users/login', {
         errors: {
            email: {
               msg: 'No se enuentra el Email'
            }
         }
      });   

   },
   profile: (req,res) => {
      return res.render ('./users/userProfile',{
         //user: req.session.userLogged
      });
   }

}

module.exports= usersController;
