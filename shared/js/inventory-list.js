function inboundOutboundList(listName) {
    var inventoryList = localStorage.getItem(listName);
    inventoryList = JSON.parse(inventoryList);

    var newRow = document.getElementById("tableBody");

    if (inventoryList == "") {
        let element = document.getElementById("inventoryListContainer");
        element.insertAdjacentHTML("beforeend", "<h5 class = 'emptyInventory'> * Inventory list is empty.</h5>");
    } else {
        for (eachInventory in inventoryList) {
            var inventoryDate = new Date(inventoryList[eachInventory].date);
            inventoryDate = inventoryDate.toDateString();
            var row = `<tr onclick= "inventoryProductList('${inventoryList[eachInventory].name}','${inventoryList[eachInventory].date}','${listName}')">
                       <td>${inventoryList[eachInventory].name}</td>
                       <td>${inventoryDate}</td> </tr>`;
            newRow.insertAdjacentHTML("beforeend", row);
        }
    }
}