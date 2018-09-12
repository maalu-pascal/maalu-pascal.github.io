var itemNumber;

function newInbound() {
    containerContent('../inbound/new-inbound/html/new-inbound.html');
    localStorage.setItem('last_val', 0);
    itemNumber = 0;
    insertItem();
}




function newItem() {
    var error = validate(localStorage.getItem('last_val'));
    if (error) {
        alert(error);
    } else {
        insertItem();
    }

}
function insertItem() {
    var selector = document.getElementById("selectors");

    var insertItems = document.createElement("div");
    insertItems.setAttribute("id","selectOptions[" + itemNumber + "]");
    insertItems.setAttribute("class","selectOptions");
    
    selector.appendChild(insertItems);
    selector.focus();

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);


    var itemCategory = document.createElement("select");
    itemCategory.setAttribute("id", "selectCategory[" + itemNumber + "]");
    itemCategory.setAttribute("class", "selectCategory");

    itemCategory.setAttribute("onchange", "selectItem(" + itemNumber + ")");
    document.getElementById("selectOptions[" + itemNumber + "]").appendChild(itemCategory);

    var option = document.createElement("option");
    var text = document.createTextNode("Select category");
    option.setAttribute("value", "");
    option.appendChild(text);
    itemCategory.appendChild(option);

    for (category in stock.currentStock) {
        var option = document.createElement("option");
        var text = document.createTextNode(category);
        option.appendChild(text);
        option.setAttribute("value", category);
        itemCategory.appendChild(option);
    }

    localStorage.setItem('last_val', itemNumber);
    itemNumber++;
}

function selectItem(param) {
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var itemCategory = document.getElementById("selectCategory[" + param + "]").value;

    if (param == localStorage.getItem('last_val') && (!document.getElementById("selectItem[" + param + "]"))) {
        var items = document.createElement("select");
        items.setAttribute("id", "selectItem[" + param + "]");
        items.setAttribute("class", "selectItem");
        items.setAttribute("onchange", "selectSubCategoryItem(" + param + ")");
        document.getElementById("selectOptions[" + param + "]").appendChild(items);

    } else {
        var items = document.getElementById("selectItem[" + param + "]");
        while (items.firstChild) {
            items.removeChild(items.firstChild);
        }
    }
    var option = document.createElement("option");
    var text = document.createTextNode("Select item");
    option.setAttribute("value", "");
    option.appendChild(text);
    items.appendChild(option);

    for (item in stock.currentStock[itemCategory]) {
        var option = document.createElement("option");
        var text = document.createTextNode(item);
        option.appendChild(text);
        option.setAttribute("value", item);
        items.appendChild(option);
    }
}

function selectSubCategoryItem(param) {
    var itemCategory = document.getElementById("selectCategory[" + param + "]").value;
    var subCategory = document.getElementById("selectItem[" + param + "]").value;

    if (itemCategory == "clothes") {
        var data = localStorage.getItem("stock");
        var stock = JSON.parse(data);

        var items = document.createElement("select");
        items.setAttribute("id", "selectSubCategoryItem[" + param + "]");
        items.setAttribute("class", "selectSubCategoryItem");
        items.setAttribute("onchange", "quantity(" + param + ")");
        document.getElementById("selectOptions[" + param + "]").appendChild(items);

        var option = document.createElement("option");
        option.setAttribute("value", "");
        var text = document.createTextNode("Select item");
        option.appendChild(text);
        items.appendChild(option);

        for (item in stock.currentStock[itemCategory][subCategory]) {
            var option = document.createElement("option");
            option.text = item;
            option.value = item;
            items.appendChild(option);
        }
    } else {                //No sub-category.
        quantity(param);
    }
}

function quantity(param) {
    if (param == localStorage.getItem('last_val') && (!document.getElementById("quantity[" + param + "]"))) {
        var itemQuantity = document.createElement("input");
        itemQuantity.setAttribute("id", "quantity[" + param + "]");
        itemQuantity.setAttribute("class", "quantity");
        itemQuantity.setAttribute("placeholder", "Enter quantity of item");
        document.getElementById("selectOptions[" + param + "]").appendChild(itemQuantity);

    }
}

function validate(param) {
    var alert;
    if (document.getElementById("selectCategory[" + param + "]").value === "") {
        alert = "Please select category!";
        document.getElementById("selectCategory[" + param + "]").focus();
    } else if (document.getElementById("selectItem[" + param + "]").value === "") {
        alert = "Please select item!";
        document.getElementById("selectItem[" + param + "]").focus();
    } else if (document.getElementById("selectCategory[" + param + "]").value == "clothes") {
        if (document.getElementById("selectSubCategoryItem[" + param + "]").value === "") {
            alert = "Please select item!";
            document.getElementById("selectSubCategoryItem[" + param + "]").focus();
        } else {
            if (document.getElementById("quantity[" + param + "]").value == "") {
                alert = "Please enter quantity!";
                document.getElementById("quantity[" + param + "]").focus();
            }
        }
    } else {
        if (document.getElementById("quantity[" + param + "]").value == "") {
            alert = "Please enter quantity!";
            document.getElementById("quantity[" + param + "]").focus();

        }
    }
    return alert;
}

function submitList() {
    var error = validate(localStorage.getItem('last_val'));
    if (error) {
        alert(error);
    } else {
        if(!document.getElementById("InboundName").value) {
            alert("Please enter name!");
        } else {
            var name = document.getElementById("InboundName").value;

            var request = new XMLHttpRequest();
            request.open("GET", "../inbound/new-inbound/json/newInboundObject.json", false);
            request.send(null);
            var newObject = request.responseText;
            newObject = JSON.parse(newObject);
            
            newObject.name = name;
            var date = new Date();
            newObject.date = date.toDateString();
    
            var itemCategory = document.getElementsByClassName("selectCategory");
            var itemSubCategoryItem = document.getElementsByClassName("selectSubCategoryItem");
            var itemName = document.getElementsByClassName("selectItem");
            var itemQuantity = document.getElementsByClassName("quantity");
    
            for (id in itemCategory) {
                if (itemCategory[id].value) {
                    if(itemCategory[id].value == "clothes") {
                        newObject.inbound[itemCategory[id].value][itemName[id].value][itemSubCategoryItem[id].value] += parseInt(itemQuantity[id].value);
                    } else {
                        newObject.inbound[itemCategory[id].value][itemName[id].value] += parseInt(itemQuantity[id].value);
                    }
                }
            }

            var inboundList = localStorage.getItem("inbound");
            inboundList = JSON.parse(inboundList);
    
            inboundList.push(newObject);
    
            inboundList = JSON.stringify(inboundList);
            localStorage.setItem("inbound",inboundList);
            inbound();

        }
    }

} 