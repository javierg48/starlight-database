/*****************************************************
* citation scope: Node Starter App Step 8
* date: 12/04/2022
* originality: based
* source https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data/views
******************************************************/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_garcjavi',
    password        : '7775',
    database        : 'cs340_garcjavi'
})

// Export it for use in our applicaiton
module.exports.pool = pool;