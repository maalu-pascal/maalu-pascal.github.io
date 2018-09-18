function inboundOutboundList(listName) {
    var inventoryList = localStorage.getItem(listName);
    inventoryList = JSON.parse(inventoryList);

    var newRow = document.getElementById("tableBody");

    for (eachInventory in inventoryList) {
        var row = `<tr onclick= "inventoryProductList('${inventoryList[eachInventory].name}','${listName}')">
                   <td>${inventoryList[eachInventory].name}</td>
                   <td>${inventoryList[eachInventory].date}</td> </tr>`;
        newRow.insertAdjacentHTML("beforeend", row);
    }
}