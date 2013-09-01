var express = require('express');
var mongoose = require('mongoose');
var app = express();
 
// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/tvprograms');

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// set up the RESTful API, handler methods are defined in controllers/program.js
var programController = require('./controllers/program.js');
app.get('/programs', programController.index);
app.get('/programs.json', programController.list);
app.get('/programs/create', programController.create);
app.post('/programs', programController.store);
app.get('/programs/:url', programController.show);
app.del('/programs/:id', programController.delete);
app.get('/', function(req, res) {
  res.redirect('/programs');
});

app.use(function(req, res) {
	res.render('404');
});

app.listen(3000);
console.log("Express server listening on port 3000");