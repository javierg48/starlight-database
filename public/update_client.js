// Get the objects we need to modify
let updatePlanetForm = document.getElementById('update');

// Modify the objects we need
updatePlanetForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputclientname = document.getElementById("pClient");
    let inputplanet = document.getElementById("input-planet");

    // Get the values from the form fields
    let clientnameValue = inputclientname.value;
    let planetValue = inputplanet.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for planet

    if (isNaN(planetValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        clientname: clientnameValue,
        planet: planetValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-planet", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, clientnameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, planetID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("clients-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == planetID) {

            // Get the location of the row where we found the matching Planet ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of planet value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign planet to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}