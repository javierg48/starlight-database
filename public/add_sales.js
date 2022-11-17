app.post('/add-sales-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let date = parseInt(data['input-date']);
    if (isNaN(date))
    {
        date = 'NULL'
    }

    let price = parseInt(data['input-price']);
    if (isNaN(price))
    {
        price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO sales (date, price) VALUES ('${data['input-date']}', '${data['input-price']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})