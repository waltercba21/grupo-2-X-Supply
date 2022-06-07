// 1. Guardar al usuario en la DB.
// 2. Buscar al usuario que se quiere loguear por su email.
// 3. Buscar un usuario por su ID. 
// 4. Editar la informacion de un usuario. 
// 5. Eliminar a un usuario de la DB.

const fs= require("fs");

const User = {
    
    fileName : '../src/data/usuarios.json',
    
    //Metodo para traer y poder leer los archivos JSON. 
    getData: function ( ){
        return JSON.parse(fs.readFileSync (this.fileName, 'utf-8'));
    },
    //Metodo para generar un ID
    generateId: function(){
        //SI tengo un usuario en el array, entonces sumale 1 al ultimo numero
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
        return lastUser.id + 1}
        
        //Si el array esta vacio y no tiene ningun usuario, entonces crea el primer usuario con ID:1
                return 1;
    },
    //Busca a todos los usuarios
    findAll: function (){
        return this.getData ();
    },

    //Buscar un usuario por ID
    findByPk: function (id){
        let allUsers = this.findAll ();
        let userFound = allUsers.find (oneUser => oneUser.id === id);
        return userFound;
    },
    //Buscar un usuario con cualquier dato (este método trae el primer objeto que se encuentre con el dato solicitado)
    findByField: function (field,text){
        let allUsers = this.findAll ();
        let userFound = allUsers.find (oneUser => oneUser[field] === text);
        return userFound;
    },
    //Crear un nuevo usuario
    create: function (userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            //Operador de propalacion, 'SpeedOperator', trae toda la informacion del objeto literal
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    //Eliminar a un usuario
    delete: function (id){
        let allUsers = this.findAll ();
        //Con este metodo filter, estamos pidiendo que se recorra todos los usuarios de a uno,
        //y queremos que nos RETORNES los usuarios que sean distintos al ID que te entregaron.
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true
    }
};


module.exports = User;