var newInventoryObject;
function createNewInventory(inventoryType) {
    containerContent('../' + inventoryType + '/new-' + inventoryType + '/html/new-' + inventoryType + '.html');
    localStorage.setItem('last_val', 0);
    itemNumber = 0;
    var request = new XMLHttpRequest();
    request.open("GET", `../${inventoryType}/new-${inventoryType}/json/new-${inventoryType}.json`, false);
    request.send(null);
    newInventoryObject = request.responseText;
    newInventoryObject = JSON.parse(newInventoryObject);
    createItem(inventoryType);
}

function inventoryNewItem(inventoryType) {
    var error = validateNewItem(localStorage.getItem('last_val'), inventoryType);
    if (error) {
        document.getElementById("newInventoryError").innerHTML= error;

        // alert(error);
    } else {
        createItem(inventoryType);
    }
}

function createItem(inventoryType) {
    var itemdiv = document.getElementById("selectors");
    var itemDivData = `<div id = itemDiv[${itemNumber}] class= itemDiv[${itemNumber}]>
                        <input type='text' id= item[${itemNumber}] class='item' placeholder = "Enter Item"></input> 
                        <input type='text' id= quantity[${itemNumber}] class= 'quantity' placeholder = "Enter quantity"></input> </div>`;
    itemdiv.insertAdjacentHTML("beforeend", itemDivData);


    localStorage.setItem('last_val', itemNumber);
    itemNumber++;

}

function validateNewItem(inputItemNumber, inventoryType) {
    var error;
    var itemName = document.getElementById(`item[${inputItemNumber}]`).value;
    var itemQuantity = document.getElementById("quantity[" + inputItemNumber + "]").value;

    if (itemName == "") {
        error = "* Please enter item";
    } else if (itemQuantity == "") {
        error = "* Please enter quantity";
    } else {
        let itemFound = false;
        for (let category in newInventoryObject.inventory) {
            for (let item in newInventoryObject.inventory[category]) {

                if (item == itemName) {
                    itemFound = true;
                    if (inventoryType == "outbound") {
                        let currentStock = localStorage.getItem("stock");
                        currentStock = JSON.parse(currentStock);
                        if (currentStock.currentStock[category][item] < itemQuantity) {
                            error = `Quantity of ${itemName} available is ${currentStock.currentStock[category][item]}`;
                        }
                    }
                }
            }
        }
        if (itemFound == false) {
            error = "* Item not found!"
        }
    }
    return error;
}

function newsubmitList(inventoryType) {
    var error = validateNewItem(localStorage.getItem('last_val'), inventoryType);
    if (!document.getElementById("inventoryName")) {
        error = "* Please enter centre name";
    }
    if (error) {
        // alert(error);
        document.getElementById("newInventoryError").innerHTML= error;

    } else {
        var name = document.getElementById("inventoryName").value;
        var itemName = document.getElementsByClassName("item");
        var itemQuantity = document.getElementsByClassName("quantity");

        let currentStock = localStorage.getItem("stock");
        currentStock = JSON.parse(currentStock);
        
        for (id in itemName) {
            for (let category in newInventoryObject.inventory) {
                for (let item in newInventoryObject.inventory[category]) {
                    if (item === itemName[id].value) {
                        console.log(item);
                        newInventoryObject.inventory[category][item] += parseInt(itemQuantity[id].value);

                        if(inventoryType == "outbound") {
                            console.log(inventoryType);
                            console.log(currentStock.currentStock[category][item]);
                            
                            
                            currentStock.currentStock[category][item] -= parseInt(itemQuantity[id].value);
                        }
                        if(inventoryType == "inbound") {
                            currentStock.currentStock[category][item] += parseInt(itemQuantity[id].value);
                        }
                        currentStock = JSON.stringify(currentStock);
                        localStorage.setItem("stock",currentStock);
                    }
                }
            }
        }

        newInventoryObject.name = name;
        var date = new Date();
        newInventoryObject.date = date.toDateString();

        console.log(newInventoryObject);

        let inventoryList = localStorage.getItem(inventoryType);
        inventoryList = JSON.parse(inventoryList);

        inventoryList.push(newInventoryObject);

        inventoryList = JSON.stringify(inventoryList);
        localStorage.setItem(inventoryType, inventoryList);
        window[inventoryType]();

    }

}
