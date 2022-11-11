
  //  code for deleteClient using regular javascript/xhttp
   function deleteClient(clientID) {
  //     // Put our data we want to send in a javascript object
       let data = {
           id: clientID
       };
      
  //     // Setup our AJAX request
       var xhttp = new XMLHttpRequest();
       xhttp.open("DELETE", "/delete-client", true);
       xhttp.setRequestHeader("Content-type", "application/json");
  
  //     // Tell our AJAX request how to resolve
       xhttp.onreadystatechange = () => {
           if (xhttp.readyState == 4 && xhttp.status == 204) {
  
  //             // Add the new data to the table
               deleteRow(clientID);
  
           }
           else if (xhttp.readyState == 4 && xhttp.status != 204) {
               console.log("There was an error with the input.")
           }
       }
  //     // Send the request and wait for the response
       xhttp.send(JSON.stringify(data));
}
   
  
  
  function deleteRow(clientID){
  
      let table = document.getElementById("client-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         //iterate through rows
         //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == clientID) {
              table.deleteRow(i);
              break;
         }
      }
  }