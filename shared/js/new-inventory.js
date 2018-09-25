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

function createItem(inventoryType) {
    var itemdiv = document.getElementById("newItemInputs");
    var itemDivData = `<div id = itemDiv[${itemNumber}] class= itemDiv>
                        <div class = "itemInputField"><input type='text' list="itemsList${itemNumber}" id= item[${itemNumber}] class='item' placeholder = "Enter Item" ></input>
                        <datalist id="itemsList${itemNumber}"></datalist></div>
                        <div><input type='number' id= quantity[${itemNumber}] class= 'quantity' placeholder = "Enter quantity"></input></div> 
                        <button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemNumber}')"> Delete </button>
                        </div>`;
    itemdiv.insertAdjacentHTML("beforeend", itemDivData);
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    let dataList = document.getElementById(`itemsList${itemNumber}`);

    //Populating the datalist. 
    for (let category in stock.currentStock) {
        for (let item in stock.currentStock[category]) {
            if (category == "clothes") {
                for (let clothes in stock.currentStock[category][item]) {
                    dataList.innerHTML += `<option value=${clothes}></option>`;
                }
            } else {
                dataList.innerHTML += `<option value=${item}></option>`;
            }
        }
    }
    localStorage.setItem('last_val', itemNumber);
    itemNumber++;
}

function deleteItem(id) {
    let div = document.getElementById(`itemDiv[${id}]`);
    div.parentNode.removeChild(div);
}

function validateNewItem(inventoryType) {
    var error;
    var itemNames = document.getElementsByClassName(`item`);
    var itemQuantity = document.getElementsByClassName(`quantity`);

    if (!document.getElementById(`new${inventoryType}Name`).value) {
        error = "* Please enter name";
        document.getElementById(`new${inventoryType}Name`).focus();
        return error;
    }
    for (let id = 0; id < itemNames.length; id++) {

        if (itemNames[id].value == "") {
            error = "* Please enter item";
            itemNames[id].focus();
            return error;
        } else if (itemQuantity[id].value == "") {
            error = "* Please enter quantity";
            itemQuantity[id].focus();
            return error;
        } else if (parseInt(itemQuantity[id].value) < 0) {
            error = "* Quantity should be a  greatnumberer than 0";
            itemQuantity[id].focus();
            return error;
        } else {
            let itemFound = false;
            for (let category in newInventoryObject.inventory) {
                for (let item in newInventoryObject.inventory[category]) {

                    if (item == itemNames[id].value) {

                        itemFound = true;
                        if (inventoryType == "outbound") {
                            var currentstock = localStorage.getItem("stock");
                            currentstock = JSON.parse(currentstock);

                            if (currentstock.currentStock[category][item] < itemQuantity[id].value) {
                                error = `Quantity of ${itemNames[id].value} available is ${currentstock.currentStock[category][item]}`;
                                itemQuantity[id].focus();
                            }
                        }
                    } else {
                        for (clothes in newInventoryObject.inventory[category][item]) {
                            if (clothes == itemNames[id].value) {
                                itemFound = true;
                                if (inventoryType == "outbound") {

                                    let currentstock = localStorage.getItem("stock");
                                    currentstock = JSON.parse(currentstock);
                                    if (currentstock.currentStock[category][item][clothes] < itemQuantity[id].value) {
                                        error = `Quantity of ${itemNames[id].value} available is ${currentstock.currentStock[category][item][clothes]}`;
                                        itemQuantity[id].focus();
                                        return error;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (itemFound == false) {
                error = "* Item not found!"
                itemNames[id].focus();
                return error;
            }
        }
    }
    return error;
}

function newsubmitList(inventoryType) {
    var error = validateNewItem(inventoryType);
    if (error) {
        document.getElementById("newInventoryError").innerHTML = error;

    } else {
        document.getElementById("newInventoryError").innerHTML = "";

        var name = document.getElementById(`new${inventoryType}Name`).value;

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
        newInventoryObject.date = new Date();


        let inventoryList = localStorage.getItem(inventoryType);
        inventoryList = JSON.parse(inventoryList);

        inventoryList.unshift(newInventoryObject);

        inventoryList = JSON.stringify(inventoryList);
        localStorage.setItem(inventoryType, inventoryList);
        window[inventoryType]();
    }
}

