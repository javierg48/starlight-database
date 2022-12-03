// Get the objects we need to modify
let updateClientForm = document.getElementById('update-client-form');

// Modify the objects we need
updateClientForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputClientID = document.getElementById("mySelectClient");
    let inputClientFirstName = document.getElementById("input-firstName-u");
    let inputClientLastName = document.getElementById("input-lastName-u");
    let inputClientPhone = document.getElementById("input-phone-u");
    let inputClientEmail = document.getElementById("input-email-u");


    // Get the values from the form fields
    let clientIDValue = inputClientID.value;
    let clientFirstNameValue = inputClientFirstName.value;
    let clientLastNameValue = inputClientLastName.value;
    let clientPhoneValue = inputClientPhone.value;
    let clientEmailValue = inputClientEmail.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being passed NULL for homeworld

    if (!clientFirstNameValue || !clientLastNameValue) 
    {
        inputClientFirstName.value = '';
        inputClientLastName.value = '';
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        clientID: clientIDValue,
        firstName: clientFirstNameValue,
        lastName: clientLastNameValue,
        phone: clientPhoneValue,
        email: clientEmailValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-client", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, data.clientID);

            // Clear the input fields for another transaction
            inputClientID.value = "test";
            inputClientFirstName.value = '';
            inputClientLastName.value = '';
            inputClientPhone.value = '';
            inputClientEmail.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, clientID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("clients-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == clientID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of all values
            let td_firstName = updateRowIndex.getElementsByTagName("td")[1];
            let td_lastName = updateRowIndex.getElementsByTagName("td")[2];
            let td_phone = updateRowIndex.getElementsByTagName("td")[3];
            let td_email = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign all values to update
            td_firstName.innerHTML = parsedData[0].firstName; 
            td_lastName.innerHTML = parsedData[0].lastName;
            td_phone.innerHTML = parsedData[0].phone; 
            td_email.innerHTML = parsedData[0].email;
       }
    }
}
