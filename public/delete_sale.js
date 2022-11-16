// code for deleteSale function using jQuery
console.log("delete sale js")
function deleteSale(saleID) {
	console.log("delete sale js")
	var link = '/delete-sale/';
	link += saleID;

	/*
	let data = {
	  id: saleID
	};
	*/
  
	$.ajax({
	  url: link,
	  type: 'DELETE',
	  /*data: JSON.stringify(data),
	  contentType: "application/json; charset=utf-8", */
	  success: function(result) {
		deleteRow(saleID);
	  }
	});
  }
  
  
function deleteRow(saleID){
	console.log("delete sale js")
	let table = document.getElementById("sales-table");
	for (let i = 0, row; row = table.rows[i]; i++) {
		if (table.rows[i].getAttribute("data-value") == saleID) {
			table.deleteRow(i);
			break;
		}
	}
}