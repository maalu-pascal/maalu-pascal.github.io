function inboundProductList(name) {
    containerContent('../inbound/inbound-product-list/html/inbound-product-list.html');
    productList(name);
}

function productList(name) {
    var inbound = localStorage.getItem("inbound");
    inbound = JSON.parse(inbound);

    for(newInbound in inbound) {
        if(inbound[newInbound].name == name) {

            document.getElementById("nameSpan").innerHTML = inbound[newInbound].name;
            document.getElementById("dateSpan").innerHTML = inbound[newInbound].date;

            for(category in inbound[newInbound].inbound) {
                
                for(items in inbound[newInbound].inbound[category]) {
                    if (category == "clothes") {
                        for(item in inbound[newInbound].inbound[category][items]) {
                            if (inbound[newInbound].inbound[category][items][item] != 0) {
                                var quantity = inbound[newInbound].inbound[category][items][item];
                                
                                productRow(items+"-"+item,quantity);
                            }
                        }
                    } else {
                        if (inbound[newInbound].inbound[category][items] != 0) {
                            var quantity = inbound[newInbound].inbound[category][items];
                            productRow(items,quantity);

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
    quantityData.setAttribute("class","itemQuantity");
    var itemquantity = document.createTextNode(" : "+quantity+" nos.");
    quantityData.appendChild(itemquantity);
    product.appendChild(quantityData);

    var productRow = document.getElementById("tBodyProducts");
    productRow.appendChild(product);
}