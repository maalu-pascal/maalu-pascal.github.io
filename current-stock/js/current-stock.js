function currentStock() {
    containerContent('../current-stock/html/current-stock.html');
    displayCurrentStock();
}

function displayCurrentStock() {

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    var table = document.getElementById("currentStockTable");
    for (category in stock.currentStock) {

        var row = `<tr><td><h4>${category} : </h4></td><td><ul>`;
        for (item in stock.currentStock[category]) {

            if (typeof (stock.currentStock[category][item]) == "object") {

                row += `<ul id = 'subcategory'> <li>${item} : <ul>`;
                for (subcategory in stock.currentStock[category][item]) {
                    row += `<li> ${subcategory} : ${stock.currentStock[category][item][subcategory]}</li>`;
                }
                row += "</ul></li></ul>";
            } else {
                row += `<li> ${item} : ${stock.currentStock[category][item]} </li>`;
            }
        }
        row += `</li></ul></tr>`;
        table.innerHTML += row;

    }

}
