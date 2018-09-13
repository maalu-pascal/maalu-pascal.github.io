function inventoryProductList(name, listName) {
    containerContent('../'+listName+'/'+listName+'-product-list/html/'+listName+'-product-list.html');
    productList(name, listName);
}

function productList(name, listName) {
    var inventoryList = localStorage.getItem(listName);
    inventoryList = JSON.parse(inventoryList);

    for (eachInventory in inventoryList) {
        if (inventoryList[eachInventory].name == name) {

            document.getElementById("nameSpan").innerHTML = inventoryList[eachInventory].name;
            document.getElementById("dateSpan").innerHTML = inventoryList[eachInventory].date;

            for (category in inventoryList[eachInventory][listName]) {

                for (items in inventoryList[eachInventory][listName][category]) {
                    if (category == "clothes") {
                        for (item in inventoryList[eachInventory][listName][category][items]) {
                            if (inventoryList[eachInventory][listName][category][items][item] != 0) {
                                var quantity = inventoryList[eachInventory][listName][category][items][item];
                                productRow(items + "-" + item, quantity);
                            }
                        }
                    } else {
                        if (inventoryList[eachInventory][listName][category][items] != 0) {
                            var quantity = inventoryList[eachInventory][listName][category][items];
                            productRow(items, quantity);
                        }

                    }
                }
            }
        }
    }
}


function productRow(item, quantity) {
    var product = document.createElement("tr");
    var itemData = document.createElement("td");
    var itemName = document.createTextNode(item);
    itemData.appendChild(itemName);
    product.appendChild(itemData);

    var quantityData = document.createElement("td");
    quantityData.setAttribute("class", "itemQuantity");
    var itemquantity = document.createTextNode(" : " + quantity + " nos.");
    quantityData.appendChild(itemquantity);
    product.appendChild(quantityData);

    var productRow = document.getElementById("tBodyProducts");
    productRow.appendChild(product);
}