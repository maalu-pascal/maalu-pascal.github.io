function currentStock() {
    containerContent('../current-stock/html/current-stock.html');
    displayCurrentStock();
}

function displayCurrentStock() {

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockTable");

    for (category in stock.currentStock) {
        var row = table.insertRow();
        row.insertCell(0).innerHTML = `<h4>${category} : </h4>`;
        let items="";
        for (item in stock.currentStock[category]) {
            if (typeof (stock.currentStock[category][item]) == "object") {
                items += `<ul id = 'subcategory'> <li>${item} : <ul>`;
                for (subcategory in stock.currentStock[category][item]) {
                    items += `<li> ${subcategory} : ${stock.currentStock[category][item][subcategory]}</li>`;
                }
                items += "</ul></li></ul>";
            } else {
                items += `<li> ${item} : ${stock.currentStock[category][item]} </li>`;
            }
        }
        items += `</li></ul>`;
        row.insertCell(1).innerHTML = items;
    }
}
