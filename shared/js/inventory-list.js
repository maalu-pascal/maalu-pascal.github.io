/**
 * The list of inventories are read from the localStorage and fed into a table.
 * 
 * @param listName - inbound/outbound 
 */
function inventory(listName) {

    changeActiveSideBar(listName);
    let inventoryList = JSON.parse(localStorage.getItem(listName));
    let table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];

    if (inventoryList == "") {
        let element = document.getElementById("inventoryListContainer");
        element.insertAdjacentHTML("beforeend", "<h5 class = 'emptyInventory'> * Inventory list is empty.</h5>");
    } else {
        for (eachInventory in inventoryList) {
            let inventoryDate = new Date(inventoryList[eachInventory].date);
            inventoryDate = inventoryDate.toDateString();

            let row = table.insertRow();
            row.setAttribute("onclick", `redirectTo('${listName}-product-list','${listName}','${inventoryList[eachInventory].name}','${inventoryList[eachInventory].date}')`);
            row.insertCell(0).innerHTML = `${inventoryList[eachInventory].name}`;
            row.insertCell(1).innerHTML = `${inventoryDate}`;
        }
    }
}