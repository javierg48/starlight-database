/*****************************************************
* citation scope: Node Starter App Step 8
* date: 12/04/2022
* originality: based
* source https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data/views
******************************************************/

// code for deleteSale function using jQuery
function deleteSale(saleID) {
	var link = '/delete-sale/';

	let data = {
	  id: saleID
	};
  
	$.ajax({
	  url: link,
	  type: 'DELETE',
	  data: JSON.stringify(data),
	  contentType: "application/json; charset=utf-8",
	  success: function(result) {
		deleteRow(saleID);
	  }
	});
  }
  
  
function deleteRow(saleID){
	let table = document.getElementById("sales-table");
	for (let i = 0, row; row = table.rows[i]; i++) {
		//iterate through rows
       	//rows would be accessed using the "row" variable assigned in the for loop
		if (table.rows[i].getAttribute("data-value") == saleID) {
			table.deleteRow(i);
			break;
		}
	}
}