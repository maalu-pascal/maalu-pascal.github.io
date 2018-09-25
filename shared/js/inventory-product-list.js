function inventoryProductList(name, date, inventoryListName) {
    containerContent(`${inventoryListName}/${inventoryListName}-product-list/html/${inventoryListName}-product-list.html`);
    productList(name, date,  inventoryListName);
}

function productList(name, date, inventoryListName) {
    let inventoryList = localStorage.getItem(inventoryListName);
    inventoryList = JSON.parse(inventoryList);

    for (eachInventory in inventoryList) {

        if (inventoryList[eachInventory].name == name && inventoryList[eachInventory].date == date) {

            let inventoryDate = new Date(inventoryList[eachInventory].date);
            inventoryDate = inventoryDate.toDateString();
            document.getElementById("nameSpan").innerHTML = inventoryList[eachInventory].name;
            document.getElementById("dateSpan").innerHTML = inventoryDate;

            for (category in inventoryList[eachInventory].inventory) {
                for (items in inventoryList[eachInventory].inventory[category]) {

                    if (category == "clothes") {
                        for (item in inventoryList[eachInventory].inventory[category][items]) {
                            
                            if (inventoryList[eachInventory].inventory[category][items][item] != 0) {
                                let quantity = inventoryList[eachInventory].inventory[category][items][item];
                                productRow(item, quantity);
                            }
                        }
                    } else {

                        if (inventoryList[eachInventory].inventory[category][items] != 0) {
                            let quantity = inventoryList[eachInventory].inventory[category][items];
                            productRow(items, quantity);
                        }
                    }
                }
            }
        }
    }
}

function productRow(item, quantity) {
    let product = `<tr><td>${item}</td><td class = "itemQuantity" >- ${quantity}</td><tr>`;
    let productRow = document.getElementById("tBodyProducts");
    productRow.insertAdjacentHTML("beforeend",product);
}