function inbound() {
    containerContent('../inbound/inbound-list/html/inbound-list.html');
    inboundList();
}

function inboundList() {
    var inbound = localStorage.getItem("inbound");
    inbound = JSON.parse(inbound);

    var newRow = document.getElementById("tableBody");

    for (eachInbound in inbound) {

        var row = document.createElement("tr");
        row.setAttribute("onclick","inboundProductList('"+inbound[eachInbound].name+"')");
        
        var nameData = document.createElement("td");
        var name = document.createTextNode(inbound[eachInbound].name);
        nameData.appendChild(name);
        row.appendChild(nameData);

        var dateData = document.createElement("td");
        var date = document.createTextNode(inbound[eachInbound].date);
        dateData.appendChild(date);
        row.appendChild(dateData);

        newRow.appendChild(row);
    }
}

