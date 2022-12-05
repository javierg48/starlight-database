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