var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var db = require('./space-db.json');

var app = express();
var PORT = process.env.PORT || 8320;

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
	console.log("HOME");
	var homeData = db[0];
	res.status(200).render('homePage', { // homePage is homePage.js auto-generated js
		overview: homeData.overview
	})
});

app.use(express.static('public')); // ????????

app.get('/clients', function(req, res, next) {
	console.log("CLIENTS");
	var clientsData = db[1];

	if (clientsData) {
		res.status(200).render('clientsPage', {
			clients: clientsData.clients
    })
  } else {
    next();
  }
});

app.get('/sales', function(req, res, next) {
	console.log("SALES");
	var salesData = db[2];

	if (salesData) {
		res.status(200).render('salesPage', {
			sales: salesData.sales
    })
  } else {
    next();
  }
});

app.get('/planets', function(req, res, next) {
	console.log("PLANETS");
	var planetsData = db[3];

	if (planetsData) {
		res.status(200).render('planetsPage', {
			planets: planetsData.planets
    })
  } else {
    next();
  }
});

app.get('/information', function(req, res, next) {
	console.log("INFORMATION");
	var informationData = db[4];

	if (informationData) {
		res.status(200).render('informationPage', {
			information: informationData.information
    })
  } else {
    next();
  }
});

app.get('/funfacts', function(req, res, next) {
	console.log("FUN FACTS");
	var funFactsData = db[5];

	if (funFactsData) {
		res.status(200).render('funFactsPage', {
			funFacts: funFactsData.funFacts
    })
  } else {
    next();
  }
});

app.get('*', function (req, res) {
	console.log("ERROR");
	res.status(404).render('404', {
		path: req.url
	})
});

app.listen(PORT, function () {
	console.log("== Server is listening on PORT", PORT);
});