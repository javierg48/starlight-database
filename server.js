// express
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8320;
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// database
var db = require('./database/db-connecter');

// handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var path = require('path');
//var db = require('./space-db.json');


/*
    ROUTES
*/

// GET ROUTES
app.get('/', function (req, res, next) {
	console.log("HOME");
	res.status(200).render('index', { overview: "For the first time ever, entire planets are exclusively for sale and Starlight \nsells official claims to planets. A database driven website will record information about \nclients, their planets, general information on the planets, and planet fun facts. Only a \nfew extremely wealthy individuals can afford to purchase entire planets, so Starlight \nanticipates its sales volume to be low and has a database with a maximum capacity of 1,000 \nplanets. The database will have the capability to support multiple planets per owner. \nTherefore, the client count should be less than the amount of planets owned. Planets can \nhave many fun facts. Since the fun facts can be unique or basic, it is possible for a \nparticular fun fact to be true for many planets. Starlight would like to store basic \ninformation on all of the planets that are sold and the clients who purchased them. Clients \ncan purchase planets at the Starlight HQ where both customer and planet information will be \nentered manually into the database once purchased."})
});

app.use(express.static('public')); // hard coded html files

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


// POST ROUTES 
app.post('/add-client-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO clients (firstName, lastName, phone, email) VALUES ('${data['input-firstName']}', '${data['input-lastName']}', '${data['input-phone']}', '${data['input-email']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM clients and
        // presents it on the screen
        else
        {
            res.redirect('/clients');
        }
    })
})


app.get('*', function (req, res) {
	console.log("ERRORR");
	res.status(404).render('404', {
		path: req.url
	})
});

app.delete('/delete-client', function(req,res,next){                                                                
	let data = req.body;
	let planetID = parseInt(data.id);
	let deletePlanets = `DELETE FROM planets WHERE planetID =:planetidInput`;
	let deleteClient= `DELETE FROM client WHERE id = :idInput`;
  
  
		  // Run the 1st query
		  db.pool.query(deletePlanets, [planetID], function(error, rows, fields){
			  if (error) {
  
			  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
			  console.log(error);
			  res.sendStatus(400);
			  }
  
			  else
			  {
				  // Run the second query
				  db.pool.query(deleteClient, [planetID], function(error, rows, fields) {
		  
					  if (error) {
						  console.log(error);
						  res.sendStatus(400);
					  } else {
						  res.sendStatus(204);
					  }
				  })
			  }
  })});

  app.put('/update-client', function(req,res,next){                                   
	let data = req.body;
  
	let planets = parseInt(data.planets);
	let client = parseInt(data.clientname);
  
	queryUpdateClient = `UPDATE client SET firstName = :firstNameInput,
				lastName = :lastNameInput,
				phone = :phoneInput,
				email = :emailInput
				WHERE id = :idInput;`;
	selectPlanets = `SELECT * FROM planets WHERE planetName LIKE planetInput`
  
		  // Run the 1st query
		  db.pool.query(queryUpdateClient, [planets, client], function(error, rows, fields){
			  if (error) {
  
			  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
			  console.log(error);
			  res.sendStatus(400);
			  }
  
			  // If there was no error, we run our second query and return that data so we can use it to update the people's
			  // table on the front-end
			  else
			  {
				  // Run the second query
				  db.pool.query(selectPlanets, [planets], function(error, rows, fields) {
		  
					  if (error) {
						  console.log(error);
						  res.sendStatus(400);
					  } else {
						  res.send(rows);
					  }
				  })
			  }
  })}); 

/*
    LISTENER
*/

app.listen(PORT, function () {
	console.log("== Server is listening on PORT", PORT);
});
