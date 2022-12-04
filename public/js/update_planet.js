// Get the objects we need to modify
let updatePlanetForm = document.getElementById('update-planet-form');

// Modify the objects we need
updatePlanetForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlanetID = document.getElementById("mySelectPlanet");
    let inputForSale = document.getElementById("input-forSale-u");
    let inputPlanetName = document.getElementById("input-planetName-u");


    // Get the values from the form fields
    let planetIDValue = inputPlanetID.value;
    let forSaleValue = inputForSale.value;
    let planetNameValue = inputPlanetName.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being passed NULL for homeworld

    if (!forSaleValue || !planetNameValue) 
    {
        inputForSale.value = '';
        inputPlanetName.value = '';
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        planetID: planetIDValue,
        forSale: forSaleValue,
        planetName: planetNameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-planet", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, data.planetID);

            // Clear the input fields for another transaction
            inputPlanetID.value = "test";
            inputForSale.value = '';
            inputPlanetName.value = '';
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
    let table = document.getElementById("planets-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == planetID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of all values
            let td_forSale = updateRowIndex.getElementsByTagName("td")[1];
            let td_planetName = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign all values to update
            td_forSale.innerHTML = parsedData[0].forSale; 
            td_planetName.innerHTML = parsedData[0].planetName;
       }
    }
}
