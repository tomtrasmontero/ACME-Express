//Require express and set up 
var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

//require swig to render html and set cache false to refresh
var swig = require('swig');
swig.setDefaults({cache:false});

var app = express();
//use path module to get and set up static middleware
app.use(express.static(path.join( __dirname, 'node_modules')));

//method override - if a post is comes in with a _, it will change its action into delete or put
app.use(methodOverride('_method'));

//use body parser to add product to productBank
app.use(bodyParser.urlencoded({extended: true}));

//set up engine to view html and use swig
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', function (req, res, next){
	res.render('home', { title: 'Home'});
});

app.use('/products', require('./routes/products'));


//set up port to listen
app.listen(process.env.PORT, function (){
	console.log('listening on port ' + process.env.PORT);
});
