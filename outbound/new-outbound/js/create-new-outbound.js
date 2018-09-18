var newInventoryObject;

function createNewInventory(inventoryType) {
    containerContent('../' + inventoryType + '/new-' + inventoryType + '/html/new-' + inventoryType + '.html');
    localStorage.setItem('last_val', 0);
    itemNumber = 0;

    var request = new XMLHttpRequest();
    request.open("GET", `../shared/json/new-inventory.json`, false);
    request.send(null);
    newInventoryObject = request.responseText;
    newInventoryObject = JSON.parse(newInventoryObject);

    createItem(inventoryType);
}

function inventoryNewItem(inventoryType) {
    var error = validateNewItem(localStorage.getItem('last_val'), inventoryType);
    if (error) {
        document.getElementById("newInventoryError").innerHTML = error;

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
    var itemQuantity = document.getElementById(`quantity[${inputItemNumber}]`).value;

    if (itemName == "") {
        error = "* Please enter item";
    } else if (itemQuantity == "") {
        error = "* Please enter quantity";
    } else if (!Number.isInteger(parseInt(itemQuantity))) {
        error = "* Quantity should be a number";
    } else {
        let itemFound = false;
        for (let category in newInventoryObject.inventory) {
            for (let item in newInventoryObject.inventory[category]) {

                if (item == itemName) {
                    itemFound = true;
                    if (inventoryType == "outbound") {
                        var currentstock = localStorage.getItem("stock");

                        currentstock = JSON.parse(currentstock);

                        if (currentstock.currentStock[category][item] < itemQuantity) {
                            error = `Quantity of ${itemName} available is ${currentstock.currentStock[category][item]}`;
                        }
                    }
                } else {
                    for (clothes in newInventoryObject.inventory[category][item]) {

                        if (clothes == itemName) {
                            itemFound = true;

                            if (inventoryType == "outbound") {

                                let currentstock = localStorage.getItem("stock");
                                currentstock = JSON.parse(currentstock);
                                if (currentstock.currentStock[category][item][clothes] < itemQuantity) {
                                    error = `Quantity of ${itemName} available is ${currentstock.currentStock[category][item][clothes]}`;

                                }

                            }
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
        document.getElementById("newInventoryError").innerHTML = error;

    } else {
        var name = document.getElementById("inventoryName").value;
        var itemName = document.getElementsByClassName("item");
        var itemQuantity = document.getElementsByClassName("quantity");

        let currentstock = localStorage.getItem("stock");
        currentstock = JSON.parse(currentstock);

        for (id in itemName) {
            for (let category in newInventoryObject.inventory) {
                for (let item in newInventoryObject.inventory[category]) {
                    if (item === itemName[id].value) {
                        newInventoryObject.inventory[category][item] += parseInt(itemQuantity[id].value);

                        if (inventoryType == "outbound") {
                            currentstock.currentStock[category][item] -= parseInt(itemQuantity[id].value);
                        }
                        if (inventoryType == "inbound") {
                            currentstock.currentStock[category][item] += parseInt(itemQuantity[id].value);
                        }
                    } else {

                        for (clothes in newInventoryObject.inventory[category][item]) {

                            if (clothes == itemName[id].value) {
                                newInventoryObject.inventory[category][item][clothes] += parseInt(itemQuantity[id].value);

                                if (inventoryType == "outbound") {
                                    currentstock.currentStock[category][item][clothes] -= parseInt(itemQuantity[id].value);
                                }
                                if (inventoryType == "inbound") {
                                    currentstock.currentStock[category][item][clothes] += parseInt(itemQuantity[id].value);
                                }
                            }
                        }
                    }
                }
            }
        }

        currentstock = JSON.stringify(currentstock);
        localStorage.setItem("stock", currentstock);

        newInventoryObject.name = name;
        var date = new Date();
        newInventoryObject.date = date.toDateString();

        let inventoryList = localStorage.getItem(inventoryType);
        inventoryList = JSON.parse(inventoryList);

        inventoryList.push(newInventoryObject);

        inventoryList = JSON.stringify(inventoryList);
        localStorage.setItem(inventoryType, inventoryList);
        window[inventoryType]();
    }
}

