const bcryptjs = require ('bcryptjs');
const {validationResult} = require ('express-validator');
const User = require ('../../models/User');
let db = require('../database/models');
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

         let errors = validationResult (req);
         if (errors.isEmpty()){
            let usersJSON = fs.readFileSync('usuarios.json', {errors:errors.errors});
            let users;
            if (usersJSON == ''){
               users = [];
            }else{
               users =JSON.parse (usersJSON);
            } 

            for (let i= 0; i < length; i++){
               if (users[i].email == req.body.email){
                  if (bcryptjs.compareSync (req.body.password, users[i].password)){
                     let usuarioALoguearse = users [i];
                     break;
                  }
               }
            }
            if (usuarioALoguearse == undefined) {
               return res.render ('./users/login', {errors: [
                  {msg: 'Credenciales Invalidas'}
               ]});
            }
            req.session.usuarioLogueado = usuarioALoguearse;

         }else{
            return res.render ('./users/userProfile',{
               errors:errors.errors});
         }
      //Buscar al usuario
      //let userToLogin = User.findByField('email', req.body.email);
     /* if (userToLogin){
         let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
         if (isOkThePassword){
            //Guardar al usuario en Session
            req.session.userLogged = userToLogin;
            res.redirect('./users/userProfile'); 
         }
         return res.render ('./users/login',{
            errors:{
               email:{
                  msg: 'Las credenciales son invalidas'
               }
            }
         });
      } 
      return res.render ('./users/login', { 
         errors: {
            email: {
               msg: 'Mail no registrado'
            }
         }
      })
   },*/  },

   profile: (req,res) => {
      
      return res.render ('./users/userProfile',{
         user: req.session.userLogged
      });
   }

};

module.exports= usersController;