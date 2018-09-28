/**
 * The inventory list (inbound/outbound) is read read from the localstorage.
 * The inventory whose name and date is matching with  the params-name and date, is found.
 * Corresponding datas are populated into a table.
 * 
 * @param name - The name/centre name of the corresponding inventory
 * @param date - The date at which the invebtory was recorded.
 * @param inventoryListName - The name of the inventoryList stored in th LocalStorage(inbound/outbound).
 */
function productList(inventoryListName, name, date) {
    let inventoryList = JSON.parse(localStorage.getItem(inventoryListName));
    let productRow = document.getElementById("tBodyProducts");


    for (eachInventory in inventoryList) {        
        if (inventoryList[eachInventory].name == name && inventoryList[eachInventory].date == date) {

            let inventoryDate = new Date(inventoryList[eachInventory].date);
            inventoryDate = inventoryDate.toUTCString();
            document.getElementById("nameSpan").innerHTML = inventoryList[eachInventory].name;
            document.getElementById("dateSpan").innerHTML = inventoryDate;

            //To create an array of objects(arrayOfItems[]) which holds the item-names and its corresponding quantity.
            arrayOfAllItems(inventoryList[eachInventory], "inventory");

            let productListArray = arrayOfItems.filter(function (obj) { return Object.values(obj)[0] > 0 });
            productListArray.forEach(item => {
                let product = `<tr><td>${Object.keys(item)[0]}</td>
                                <td class = "itemQuantity" >- ${Object.values(item)[0]}</td><tr>`;
                productRow.insertAdjacentHTML("beforeend", product);
            });
            break;
        }
    }
}