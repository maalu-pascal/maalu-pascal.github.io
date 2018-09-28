/**
 * The current stock is read from the localStorage and the data is fed into a table as a list.
 */
function displayCurrentStock() {

    let stock = JSON.parse(localStorage.getItem("stock"));
    let table = document.getElementById("currentStock-tbody");

    for (category in stock.currentStock) {
        let row = table.insertRow();
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
