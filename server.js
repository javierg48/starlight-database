// express
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8320;

// database
var db = require('./database/db-connecter');

// handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var path = require('path');
//var db = require('./space-db.json');




app.get('/', function (req, res, next) {
	console.log("HOME");
	res.status(200).render('index', { overview: "For the first time ever, entire planets are exclusively for sale and Starlight \nsells official claims to planets. A database driven website will record information about \nclients, their planets, general information on the planets, and planet fun facts. Only a \nfew extremely wealthy individuals can afford to purchase entire planets, so Starlight \nanticipates its sales volume to be low and has a database with a maximum capacity of 1,000 \nplanets. The database will have the capability to support multiple planets per owner. \nTherefore, the client count should be less than the amount of planets owned. Planets can \nhave many fun facts. Since the fun facts can be unique or basic, it is possible for a \nparticular fun fact to be true for many planets. Starlight would like to store basic \ninformation on all of the planets that are sold and the clients who purchased them. Clients \ncan purchase planets at the Starlight HQ where both customer and planet information will be \nentered manually into the database once purchased."})
});




app.use(express.static('public')); // ????????

app.get('/clients', function(req, res, next) {
	console.log("CLIENTS");

	let query1 = "SELECT * FROM clients;";
	db.pool.query(query1, function(error, rows, fields){
		res.render('clients', {data: rows});
	})
});

app.get('/sales', function(req, res, next) {
	console.log("SALES");

	let query1 = "SELECT * FROM sales;";
	db.pool.query(query1, function(error, rows, fields){
		res.render('sales', {data: rows});
	})
});


app.get('/planets', function(req, res, next) {
	console.log("PLANETS");

	let query1 = "SELECT * FROM planets;";
	db.pool.query(query1, function(error, rows, fields){
		res.render('planets', {data: rows});
	})
});


app.get('/information', function(req, res, next) {
	console.log("INFORMATION");

	let query1 = "SELECT * FROM information;";
	db.pool.query(query1, function(error, rows, fields){
		res.render('information', {data: rows});
	})
});


app.get('/funFacts', function(req, res, next) {
	console.log("FUN FACTS");

	let query1 = "SELECT * FROM funFacts;";
	db.pool.query(query1, function(error, rows, fields){
		res.render('funFacts', {data: rows});
	})
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