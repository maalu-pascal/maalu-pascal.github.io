/**
 * Initializing some global data.
 * Populating the data-list.
 * Render the createItem().
 * 
 * @param inventoryType - inbound/outbound
 */
function createNewInventory(inventoryType) {

    //Count for each new item is initialised.
    localStorage.setItem('last_val', 0);
    itemNumber = 0;

    //Populating the data-list of items.
    populateDatalist();

    //The first div with input fields for item name and quantity is created.
    createItem(inventoryType);
}

/**
 * Populating the data-list.
 */
function populateDatalist() {
    let dataList = document.getElementById(`itemDataList`);
    let arrayOfItems = arrayOfAllItems(JSON.parse(localStorage.getItem("stock")), "currentStock");

    let items = arrayOfItems.map((key) => Object.keys(key)[0]);
    items.forEach(element => {
        dataList.insertAdjacentHTML("beforeend", `<option value=${element}></option>`);
    });
}

/**
 * A new div with input fields for item name and quantity, along with the datalist and a delete button is inserted to the newItemInputs div.
 * 
 * @param inventoryType - inbound/outbound
 */
function createItem(inventoryType) {
    let itemdiv = document.getElementById("newItemInputs");
    let itemDivData = `<div id = itemDiv[${itemNumber}] class= itemDiv>
                        <div class = "itemInputField"><input type='text' list="itemDataList" id= 'item[${itemNumber}]' class='item' placeholder = "Enter Item" ></input></div>
                        <div><input type='number' id= quantity[${itemNumber}] class= 'quantity' placeholder = "Enter quantity"></input></div> 
                        <button type="button" id = "deleteButton" class="deleteItem" onclick="deleteItem('${itemNumber}')"> Delete </button>
                        </div>`;
    itemdiv.insertAdjacentHTML("beforeend", itemDivData);

    document.getElementById(`item[${itemNumber}]`).focus();
    
    localStorage.setItem('last_val', itemNumber);
    itemNumber++;
}

/**
 * The function is called when the delete button is pressed.
 * The div containing the corresponding input fields are removed.
 * 
 * @param id - ID of the div containing the input fields for itemName and quantity.
 */
function deleteItem(id) {
    let div = document.getElementById(`itemDiv[${id}]`);
    div.parentNode.removeChild(div);
}

/**
 * Validation for all the inputs.
 *  
 * @param inventoryType - inbound/outbound
 */
function validateNewItems(inventoryType) {
    let error;
    let itemNames = document.getElementsByClassName(`item`);
    let itemQuantity = document.getElementsByClassName(`quantity`);
    let arrayOfItems = arrayOfAllItems(JSON.parse(localStorage.getItem("stock")), "currentStock");

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
        } else if (parseInt(itemQuantity[id].value) <= 0) {
            error = "* Quantity should be a number greater than 0";
            itemQuantity[id].focus();
            return error;
        } else {
            let itemFoundFlag = false;
            let foundItem = arrayOfItems.find(function (obj) { return Object.keys(obj)[0] === itemNames[id].value });

            if (foundItem) {
                itemFoundFlag = true;
                if (inventoryType == "outbound") {

                    if (foundItem[itemNames[id].value] < itemQuantity[id].value) {
                        error = `Quantity of ${itemNames[id].value} available is ${foundItem[itemNames[id].value]}`;
                        itemQuantity[id].focus();
                    } else {
                        
                        //If the item is entered for the second time, the quantity required the previous time should also be stored.
                        foundItem[itemNames[id].value] -= itemQuantity[id].value;
                    }
                }
            }
            if (itemFoundFlag == false) {
                error = "* Item not found!"
                itemNames[id].focus();
                return error;
            }
        }
    }
    return error;
}

/**
 * Checks if there are any validation errors.
 * If error is found, error is inserted to a span.
 * If no error, a template is read from a JSON file.
 * The quantity corresponding to the new item is changed in the template object variable and the current stock is updated.
 * The template variable is later pushed into the corresponding inventory array in the localstorage.
 *  
 * @param inventoryType - inbound/outbound
 */
function submitNewList(inventoryType) {
    let error = validateNewItems(inventoryType);
    if (error) {
        document.getElementById("newInventoryError").innerHTML = error;
    } else {
        document.getElementById("newInventoryError").innerHTML = "";

        //A template for the new-inventory is read from the JSON file. 
        let request = new XMLHttpRequest();
        request.open("GET", `shared/json/new-inventory.json`, false);
        request.send();
        let newInventoryObject = JSON.parse(request.responseText);

        let name = document.getElementById(`new${inventoryType}Name`).value;
        let itemName = document.getElementsByClassName("item");
        let itemQuantity = document.getElementsByClassName("quantity");

        let currentstock = JSON.parse(localStorage.getItem("stock"));

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

                        for (subCategoryItem in newInventoryObject.inventory[category][item]) {

                            if (subCategoryItem == itemName[id].value) {
                                newInventoryObject.inventory[category][item][subCategoryItem] += parseInt(itemQuantity[id].value);

                                if (inventoryType == "outbound") {
                                    currentstock.currentStock[category][item][subCategoryItem] -= parseInt(itemQuantity[id].value);
                                }
                                if (inventoryType == "inbound") {
                                    currentstock.currentStock[category][item][subCategoryItem] += parseInt(itemQuantity[id].value);
                                }
                            }
                        }
                    }
                }
            }
        }

        localStorage.setItem("stock", JSON.stringify(currentstock));

        newInventoryObject.name = name;
        newInventoryObject.date = new Date();

        inventoryList = JSON.parse(localStorage.getItem(inventoryType));
        inventoryList.unshift(newInventoryObject);
        localStorage.setItem(inventoryType, JSON.stringify(inventoryList));

        redirectTo(inventoryType, inventoryType);
    }
}
