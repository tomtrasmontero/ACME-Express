var express = require('express');
var app = express();
var path = require('path');
var Products = require('../productBank');
var bodyParser = require('body-parser');
var router = express.Router();


//to home page
router.get('/', function (req, res, next){
	res.render('home', { title: 'Home'});
});

//to products page, product: is being sent to products.html
router.get('/products', function (req, res, next){
	res.render('products', { title: 'Products' , product: Products.getProducts(), showForm: false, showForm1: true});
});

//edit product names
router.post('/products/edit', function (req, res, next){	
	res.render('products', { title: 'Products' , product: Products.getProducts(), showForm: true , showForm1: false});
});
router.post('/edit/:id/:name', function (req, res, next){
	Products.editProduct(req.params.id*1 , req.body.content);
	res.redirect('/products');
});

//delete products using methodOverride Post into delete
router.delete('/products/:id', function (req, res, next){
	Products.deleteProduct(req.params.id*1);
	res.redirect('/products');
});

//add products using same method as above, listen to form submited in product html with name 'content'
router.post('/products', function(req,res,next){
	Products.addProduct(req.body.content);
	res.redirect('/products');
});


module.exports = router;