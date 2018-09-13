function inbound() {
    containerContent('../inbound/inbound-list/html/inbound-list.html');
    inboundOutboundList("inbound");
}

function inboundOutboundList(listName) {
    var inventoryList = localStorage.getItem(listName);
    inventoryList = JSON.parse(inventoryList);

    var newRow = document.getElementById("tableBody");

    for (eachInventory in inventoryList) {

        var row = document.createElement("tr");
        row.setAttribute("onclick","inventoryProductList('"+inventoryList[eachInventory].name+"','"+listName+"')");
        
        var nameData = document.createElement("td");
        var name = document.createTextNode(inventoryList[eachInventory].name);
        nameData.appendChild(name);
        row.appendChild(nameData);

        var dateData = document.createElement("td");
        var date = document.createTextNode(inventoryList[eachInventory].date);
        dateData.appendChild(date);
        row.appendChild(dateData);

        newRow.appendChild(row);
    }
}

