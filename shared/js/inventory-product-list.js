function inventoryProductList(name, inventoryListName) {
    containerContent('../'+inventoryListName+'/'+inventoryListName+'-product-list/html/'+inventoryListName+'-product-list.html');
    productList(name, inventoryListName);
}

function productList(name, inventoryListName) {
    let inventoryList = localStorage.getItem(inventoryListName);
    inventoryList = JSON.parse(inventoryList);

    for (eachInventory in inventoryList) {

        if (inventoryList[eachInventory].name == name) {

            document.getElementById("nameSpan").innerHTML = inventoryList[eachInventory].name;
            document.getElementById("dateSpan").innerHTML = inventoryList[eachInventory].date;

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
    var product = `<tr><td>${item}</td><td class = "itemQuantity" >- ${quantity}</td><tr>`;
    var productRow = document.getElementById("tBodyProducts");
    productRow.insertAdjacentHTML("beforeend",product);
}