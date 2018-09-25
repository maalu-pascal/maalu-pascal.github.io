function inboundOutboundList(listName) {
    let inventoryList = localStorage.getItem(listName);
    inventoryList = JSON.parse(inventoryList);

    let newRow = document.getElementById("tableBody");

    if (inventoryList == "") {
        let element = document.getElementById("inventoryListContainer");
        element.insertAdjacentHTML("beforeend", "<h5 class = 'emptyInventory'> * Inventory list is empty.</h5>");
    } else {
        for (eachInventory in inventoryList) {
            let inventoryDate = new Date(inventoryList[eachInventory].date);
            inventoryDate = inventoryDate.toDateString();
            let row = `<tr onclick= "inventoryProductList('${inventoryList[eachInventory].name}','${inventoryList[eachInventory].date}','${listName}')">
                       <td>${inventoryList[eachInventory].name}</td>
                       <td>${inventoryDate}</td> </tr>`;
            newRow.insertAdjacentHTML("beforeend", row);
        }
    }
}