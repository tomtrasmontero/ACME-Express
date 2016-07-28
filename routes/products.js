var express = require('express');
var app = express();
var Product = require('../product.model');
var router = express.Router();


router.get('/', function (req, res, next){
	res.render('products', { title: 'Products' , product: Product.getProducts()});
});

router.get('/edit', function (req, res, next){	
	res.render('products', { title: 'Products' , product: Product.getProducts(), showForm: true });
});

router.put('/:id', function (req, res, next){
	Product.editProduct(req.params.id*1 , req.body.content);
	res.redirect('/products');
});

router.delete('/:id', function (req, res, next){
	Product.deleteProduct(req.params.id*1);
	res.redirect('/products');
});

router.post('/', function(req,res,next){
	Product.addProduct(req.body.content);
	res.redirect('/products');
});


module.exports = router;
