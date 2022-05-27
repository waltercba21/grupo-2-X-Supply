const express = require ('express');
const router = express.Router();
const multer = require ('multer')
const path = require ('path')

const productsController = require ('../Controllers/productsController');

//---------MULTER-------//
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/images/productos')
    },
    filename: (req, file, cb) => {
        const newFilename = 'product' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename)
    }
});

const uploadFile = multer({storage});

 //---------CARRITO DE PRODUCTOS-------//
router.get ('/productCart', productsController.productCart);


//---------CREAR PRODUCTOS-------//
router.get ('/createProduct', productsController.createProduct);
router.post('/createProduct', uploadFile.any(), productsController.store)

//---------HOME DE PRODUCTOS-------//
router.get ('/', productsController.products);

//====== PRODUCT DELETE =============================
router.delete('/editProduct/:id', productsController.delete)

//---------DETALLE DE PRODUCTOS-------//
router.get ('/productDetail/:id', productsController.productDetail);

//---------EDITAR PRODUCTOS-------//

router.get ('/editProduct/:id', productsController.editProduct);
router.put('/editProduct/:id', uploadFile.any(), productsController.editModif)


module.exports = router;