const fs = require ('fs')

const path = require('path')
const productsFilePath = path.join(__dirname, "../data/productos.json");

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const productsController= {
   productCart: (req, res) => {
      res.render ('productCart')
 },

   productDetail: (req, res) => {
      let id = req.params.id;
      let product = products.find((product) => product.id == id);
      res.render ('productDetail', {product})

 },

 createProduct: (req, res) => {
   res.render ('createProduct')
},

editProduct: (req, res) => {
   res.render ('editProduct')
},

products: (req,res) => {
res.render ('products', {products})
}

}

module.exports = productsController;