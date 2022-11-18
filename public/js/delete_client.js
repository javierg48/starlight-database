
   function deleteClient(clientID) {
       let data = {
           id: clientID
       };

       var xhttp = new XMLHttpRequest();
       xhttp.open("DELETE", "/delete-client", true);
       xhttp.setRequestHeader("Content-type", "application/json");
  
       xhttp.onreadystatechange = () => {
           if (xhttp.readyState == 4 && xhttp.status == 204) {
  
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
  
      let table = document.getElementById("clients-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == clientID) {
              table.deleteRow(i);
              break;
         }
      }
  }