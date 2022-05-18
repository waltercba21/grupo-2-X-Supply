const express = require ('express');
const router = express.Router();
const multer = requite ('multer')
const path = require ('path')
const productsController = require ('../Controllers/productsController');

router.get ('/productCart', productsController.productCart);

router.get ('/productDetail/:id', productsController.productDetail);
router.get ('/editProduct', productsController.editProduct);
router.get ('/createProduct', productsController.createProduct);
router.get ('/', productsController.products);

module.exports = router;