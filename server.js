//Require express and set up 
var express = require('express');
var app = express();
var path = require('path');
var methodOverride = require('method-override');
var Products = require('./productBank');
var bodyParser = require('body-parser');
//require seig to render html and set cache false to refresh
var swig = require('swig');
swig.setDefaults({cache:false});


//use path module to get and set up static middleware
var path = require('path');
app.use(express.static(path.join( __dirname, 'node_modules')));

//method override - if a post is comes in with a _, it will change its action into delete or put
app.use(methodOverride('_method'));


//use body parser to add product to productBank
app.use(bodyParser.urlencoded({extended: true}));

//set up engine to view html and use swig
app.set('view engine', 'html');
app.engine('html', swig.renderFile);


//to home page
app.get('/', function (req, res, next){
	res.render('home', { title: 'Home'});
});

//to products page, product: is being sent to products.html
app.get('/products', function (req, res, next){
	res.render('products', { title: 'Products' , product: Products.getProducts()});
});


//edit product names
app.put('/products/edit', function (req, res, next){
	res.render('products', { title: 'Products' , product: Products.getProducts(), showForm: true});

});

app.put('/products/:id/:name', function (req, res, next){
	Products.editProduct(req.params.id , req.params.name);
	res.redirect('/products');
});


//delete products using methodOverride Post into delte
app.delete('/products/:id', function (req, res, next){
	Products.deleteProduct(req.params.id*1);
	res.redirect('/products');
});

//add products using same method as above, listen to form submited in product html with name 'content'
app.post('/products', function(req,res,next){
	Products.addProduct(req.body.content);
	res.redirect('/products');
});


//set up port to listen
app.listen(3000, function (){
	console.log('listening on port 3000');
});