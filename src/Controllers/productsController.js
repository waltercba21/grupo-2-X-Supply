const productsController= {
    productCart: (req, res) => {
    res.render ('productCart')
 },

 productDetail: (req, res) => {
    res.render ('productDetail')
 },

 admProduct: (req, res) => {
   res.render ('admProduct')
}

}

module.exports = productsController;


