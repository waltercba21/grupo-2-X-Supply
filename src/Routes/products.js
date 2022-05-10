const express = require ('express');
const router = express.Router();
const productsController = require ('../Controllers/productsController');

router.get ('/productCart', productsController.productCart);

router.get ('/productDetail', productsController.productDetail);
router.get ('/admProduct', productsController.admProduct);

module.exports = router;