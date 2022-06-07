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
      
   }
   console.log(req.body)
   User.create(req.body);
   return res.send ('Se guardo al Usuario Coorectamente'); 
  },
   
   login: (req, res) => {
      res.render ('./users/login')
 },

}

module.exports= usersController;
