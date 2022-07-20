const bcryptjs = require ('bcryptjs');
const {validationResult} = require ('express-validator');
const User = require ('../../models/User');
let db = require('../database/models');


const usersController = {
   register: (req, res) => {
      db.User.findAll()
		.then(function(users){
			res.render ('./users/register', {users:users})
		}) 
   },
   processRegister: async (req,res) =>{
   const resultValidation = validationResult(req);
   if (resultValidation.errors.length > 0){
      return res.render ('./users/register', {
         errors: resultValidation.mapped (),
         oldData : req.body
         });
   }
   //Este metodo permite que no se registren dos veces con el mismo email.
   let userInDB = await db.User.findOne({
      where: {
         email: req.body.email
      }
   })
   if (userInDB){ 
      return res.render ('./users/register',{
         errors: {
            email: {
               msg: 'El usuario ya se encuentra en la base de datos'
            }
         },
         oldData: req.body 
      });
   }
   db.User.create({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		address: req.body.address,
		phone: req.body.phone,
		password : bcryptjs.hashSync(req.body.password,10),
		image: req.file.filename
	   })
	.then(function(){
		res.redirect("./login")
	   });
   },

   login: (req, res) => {
      res.render ('./users/login')
   },

   loginProcess: async (req,res) => {
      console.log(req.body);
      let userToLogin = await db.User.findOne({
         where: {
            email: req.body.email
         }
      })
      if (userToLogin){
         bcryptjs.compareSync (req.body.password, userToLogin.password)
            res.render ('./users/userProfile', {user:userToLogin})
      }else{
         res.render ('./users/login', {user:userToLogin})
         }
   },




     /*  db.User.findOne(req.body.email)
      .then(function(user){
         if (req.body.email === user.email){
            bcryptjs.compareSync (req.body.password, user.password)
               res.render ('./users/userProfile', {user:user})
         }else{
            res.render ('./users/login', {user:user})
         }
      })
   }, */

      /* if (users[i].email == req.body.email){
               if (bcryptjs.compareSync (req.body.password, users[i].password)){
                  let usuarioALoguearse = users [i];
                  break;
               }
            }
         }
         if (usuarioALoguearse == undefined) {
            return res.render ('./users/login', {errors: [
               {msg: 'Credenciales Invalidas'}, {users:users}
            ]});
         }
         req.session.usuarioLogueado = usuarioALoguearse;
         }else{
            return res.render ('./users/userProfile',{
               errors:errors.errors}, {users:users});
         } */

   profile: (req, res) => {
		db.User.findByPk(req.params.id)
		.then(function(users){
			res.render('./users/userProfile/'+ req.params.id, {users:users}, {
            user: req.session.userLogged
         })
		})
	},

   list: (req, res) => {
		db.User.findAll()
		.then(function(users){
			res.render ('./users/users', {users:users})
		})
	}

};

module.exports= usersController;