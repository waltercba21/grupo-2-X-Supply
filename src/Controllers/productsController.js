const fs = require ('fs')

const path = require('path')
const productsFilePath = path.join(__dirname, "../data/productos.json");

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))

const productsController= {
   productCart: (req, res) => {
      res.render ('./products/productCart')
 },

   productDetail: (req, res) => {
      let id = req.params.id;
      let product = products.find((product) => product.id == id);
      res.render ('./products/productDetail', {product})

 },

 createProduct: (req, res) => {
   res.render ('./products/createProduct')
},

store: (req, res) => {
    

	let image;
		if(req.file !=undefined ) {
			image = req.file.filename;
		} else {
			image = "default-image.png";
		}
		let newProducto = {
			id: products[products.length -1].id + 1,
			...req.body,
			imagen: image,
		};

		products.push(newProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/products");

 },

editProduct: (req, res) => {
	let id = req.params.id;
	let productToEdit = products.find((product) => product.id == id);
	res.render ('./products/editProduct', {productToEdit})
},

editModif: (req,res) => {
	let id = req.params.id; 
	let producToEdit = products.find(producto => producto.id == id); 
	let image 

	if (req.files[0] != undefined) {
		image = req.files[0].filename;
	} else {
		image = producToEdit.imagen;
	}

   producToEdit = {
		id: producToEdit.id,
		...req.body,
		imagen: image
	}

	let newProducts = products.map(products => {
		if (products.id == producToEdit.id) {
			return products = {...producToEdit}; 
		}
		return products; 
	})

	

	fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
	res.redirect("/");

},
delete: (req, res) => {

    
    let id = req.params.id;
    
    let productToDelete = products.filter(product => product.id != id);


    fs.writeFileSync(productsFilePath, JSON.stringify(productToDelete, null, ' '));
    res.redirect('/products')

  },

products: (req,res) => {
res.render ('./products/products', {products})
}



}

module.exports = productsController;