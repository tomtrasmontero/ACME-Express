//Require express and set up 
var express = require('express');
var app = express();
// var path = require('path');
var methodOverride = require('method-override');
// var Products = require('./productBank');
var bodyParser = require('body-parser');
var routes = require('./routes/')

//require swig to render html and set cache false to refresh
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

app.use('/', routes);


//set up port to listen
app.listen(3000, function (){
	console.log('listening on port 3000');
});