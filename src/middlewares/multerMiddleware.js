const path = require ('path');
const multer = require ('multer');

const storage = multer.diskStorage ({
    destination : (req, file, cb) => { 
        cb (null,path.join(__dirname, '../../public/images/Usuarios'))
    },
    filename : (req, file, cb) => {
        
        const newFileName = 'user-' + Date.now () + path.extname(file.originalname);   
        cb (null, newFileName);
    }           
});

const upload = multer ({ storage }); 

module.exports = upload;
  