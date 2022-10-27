var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var db = require('./space-db.json');

var app = express();
var PORT = process.env.PORT || 8320;

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



console.log("line 22");

app.get('/', function (req, res, next) {
	console.log("HOME");
	var homeData = db[0];

	res.status(200).render('homePage', { // homePage is homePage.js auto-generated js
		overview: homeData.overview
	})
});



app.use(express.static('public')); // ????????

/*
app.get('/clients', function(req, res, next) {
	var clientsData = db[1];

	if (clientsData) {
		res.status(200).render('clientsPage', {
			id: clientsData.id,
			firstName: clientsData.firstName, 
			lastName: clientsData.lastName, 
			phone: clientsData.phone, 
			email: clientsData.email
    })
  } else {
    next();
  }
});
*/
app.get('*', function (req, res) {
	console.log("ERROR");
	res.status(404).render('404', {
		path: req.url
	})
});

app.listen(PORT, function () {
	//console.log(db[0])
	console.log("== Server is listening on PORT", PORT);
});