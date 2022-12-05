// code for deleteSale function using jQuery
function deleteClient(clientID) {
	var link = '/delete-client/';

	let data = {
	  id: clientID
	};
  
	$.ajax({
	  url: link,
	  type: 'DELETE',
	  data: JSON.stringify(data),
	  contentType: "application/json; charset=utf-8",
	  success: function(result) {
		deleteRow(clientID);
	  }
	});
  }
  
  
function deleteRow(clientID){
	let table = document.getElementById("clients-table");
	for (let i = 0, row; row = table.rows[i]; i++) {
		if (table.rows[i].getAttribute("data-value") == clientID) {
			//iterate through rows
       		//rows would be accessed using the "row" variable assigned in the for loop
			table.deleteRow(i);
			break;
		}
	}
}