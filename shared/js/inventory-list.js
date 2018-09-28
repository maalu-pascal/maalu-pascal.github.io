/**
 * The list of inventories are read from the localStorage and fed into a table.
 * 
 * @param listName - inbound/outbound 
 */
function inventory(listName) {
    let inventoryList = JSON.parse(localStorage.getItem(listName));
    let newRow = document.getElementById("tableBody");

    if (inventoryList == "") {
        let element = document.getElementById("inventoryListContainer");
        element.insertAdjacentHTML("beforeend", "<h5 class = 'emptyInventory'> * Inventory list is empty.</h5>");
    } else {
        for (eachInventory in inventoryList) {
            let inventoryDate = new Date(inventoryList[eachInventory].date);
            inventoryDate = inventoryDate.toDateString();
            let row = `<tr onclick= "redirectTo('${listName}-product-list','${listName}','${inventoryList[eachInventory].name}','${inventoryList[eachInventory].date}')">
                       <td>${inventoryList[eachInventory].name}</td>
                       <td>${inventoryDate}</td> </tr>`;
            newRow.insertAdjacentHTML("beforeend", row);
        }
    }
}