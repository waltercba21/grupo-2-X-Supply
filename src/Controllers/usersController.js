const bcryptjs = require ('bcryptjs');
const {validationResult} = require ('express-validator');
const User = require ('../../models/User');

const usersController = {
   
   register: (req, res) => {
      res.render ('./users/register')  
 },
   
   processRegister: (req,res) =>{
   const errors = validationResult(req);
   if (errors.isEmpty()){
      let user = req.body;
      userId = User.create(user);

      
      res.redirect('login')
      
   } else {
       res.render ('./users/register', 
       {errors: errors.array(),
           old: req.body
      });


   }
  
      
   },

   
   login: (req, res) => {
      res.render ('./users/login')
 },
    loginProcess: (req,res) => {
      const errors = validationResult(req);
         if (errors.isEmpty()){
         let user = req.body;
         
         userId = User. create(user);
      
         res.redirect ('userProfile',);
      
   } else {
       res.render ('./users/login', 
       {errors: errors.array(),
           old: req.body
      });


   } 
  
      //Buscar al usuario
     /* let userToLogin = User.findByField ('email', req.body.email);
      
     if(userToLogin){
            let isOkThePassword = bcryptjs.compareSync(req.body.password,userToLogin.password);
         
          if (isOkThePassword){
            //Con este metodo borramos la contraseña cada vez que el usuario quiera volver a ingresar (Por Seguridad)
            //delete userToLogin.password;
            //Con este metodo guardamos el usuario en SESSION;
            req.session.userLogged = userToLogin;
            
             res.redirect('userProfile');
      } 
       return res.render ( './users/login', {
          errors: {
             email:{
                msg: 'Las credenciales son invalidas'
             }
          }
       })*/
       
      
      //Si no encuentra el mail registrado utiliza este metodo
      //return res.render ('./users/login', {
        // errors: {
          //  email: {
            //   msg: 'No se enuentra el Email'
            //}
        // }
      //}); 
   //}

  
},
 profile: (req,res) => {
      res.render ('./users/userProfile',
         //user: req.session.userLogged
      );
   }

}

module.exports= usersController;
