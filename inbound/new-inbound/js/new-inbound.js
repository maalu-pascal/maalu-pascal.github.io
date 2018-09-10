
function newInbound() {
    containerContent('../inbound/new-inbound/html/new-inbound.html');
    
    insertItem();
}

function insertItem() {

    document.getElementById("selectItem").style.visibility = "hidden";
    document.getElementById("selectSubCategoryItem").style.visibility = "hidden";
    document.getElementById("quantity").disabled = true;

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var itemCategory = document.getElementById("selectCategory");
    itemCategory.innerHTML = "";

    var option = document.createElement("option");
    option.text = "Select Category";
    option.value = "";
    itemCategory.appendChild(option);

    for (category in stock.currentStock) {
        var option = document.createElement("option");
        option.text = category;
        option.value = category;

        itemCategory.appendChild(option);
    }

}

function selectItem() {

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);
    document.getElementById("selectItem").style.visibility = "visible";

    var itemCategory = document.getElementById("selectCategory").value;
    var items = document.getElementById("selectItem");
    items.innerHTML = "";

    var option = document.createElement("option");
    option.style.visibility = "visible";
    option.text = "Select item";
    option.value = "";
    items.appendChild(option);

    for (item in stock.currentStock[itemCategory]) {
        var option = document.createElement("option");
        option.text = item;
        option.value = item;
        items.appendChild(option);
    }
    document.getElementById("selectItem").addEventListener("change", selectSubItem);

}

function selectSubItem() {
    var itemCategory = document.getElementById("selectCategory").value;
    var subCategory = document.getElementById("selectItem").value;

    console.log("success");
    if (itemCategory == "clothes") {
        var data = localStorage.getItem("stock");
        var stock = JSON.parse(data);
        document.getElementById("selectSubCategoryItem").style.visibility = "visible";

        var items = document.getElementById("selectSubCategoryItem");
        items.innerHTML = "";

        var option = document.createElement("option");
        option.text = "Select item";
        option.value = "";
        items.appendChild(option);

        for (item in stock.currentStock[itemCategory][subCategory]) {
            var option = document.createElement("option");
            option.text = item;
            option.value = item;
            items.appendChild(option);
        }
        document.getElementById("selectSubCategoryItem").addEventListener("change", quantity);


    } else {
        quantity();
    }
}

function quantity() {

    var itemQuantity = document.getElementById("quantity");
    itemQuantity.disabled = false;
}

function newItem() {
    var itemCategory = document.getElementById("selectCategory").value;
    var item = document.getElementById("selectItem").value;
    var subCategoryItem = document.getElementById("selectSubCategoryItem").value;

    var itemQuantity = document.getElementById("quantity").value;

    console.log("qw", itemCategory, item, subCategoryItem, itemQuantity);

    document.getElementById("selectCategory").selectedIndex = "0";
    document.getElementById("selectItem").selectedIndex = "0";
    document.getElementById("selectSubCategoryItem").selectedIndex = "0";
    document.getElementById("quantity").value = "";
}

function submit() {
    if ((document.getElementById("selectCategory").value == "")) {// || (document.getElementById("selectItem") == null) || (document.getElementById("selectSubCategoryItem") == null)) {
        alert("Please choose an input");

    } else {
        if (document.getElementById("quantity").value == "") {
            alert("Quantity cannot be left empty");
        } else {
            if (document.getElementById("quantity").value == "") {
                alert("Quantity cannot be left empty");
            } else {

            }
        }
    }
}