
var itemNumber = 0;
function newInbound() {
    containerContent('../inbound/new-inbound/html/new-inbound.html');
    // document.getElementById("selectItem").disabled = true;
    // document.getElementById("selectSubCategory").style.visibility = "hidden";
    // document.getElementById("quantity").disabled = true;
    // category();

    insertItem();
}

function insertItem() {

    itemNumber++;
    var insertItem = document.getElementById("selectOptions");
    
    var div = "<div><div><select id=\"selectCategory[" + itemNumber + "]\" onchange='selectItem(" + itemNumber + ")' autofocus><option>Select category</option></select><select id='selectItem[" + itemNumber + "]' onchange='selectSubItem()'></option><option>Select item</option></select><select id='selectSubCategory[" + itemNumber + "]' onchange='quantity()'></option><option>Select item</option></select></div><div><input type='text' id='quantity[" + itemNumber + "]' placeholder='Enter Quantity of items'></div></div>";
    insertItem.innerHTML += div;
    document.getElementById("selectItem[" + itemNumber + "]").disabled = true;
    document.getElementById("selectSubCategory[" + itemNumber + "]").style.visibility = "hidden";
    // document.getElementById("quantity["+itemNumber+"]").disabled = true;

    console.log("insert");
    var itemCategory = document.getElementById("selectCategory[" + itemNumber + "]").value;
    var subCategory = document.getElementById("selectItem[" + itemNumber + "]").value;
    var selectItem = document.getElementById("selectSubCategory[" + itemNumber + "]").value;
    console.log(itemCategory, subCategory, selectItem);

    category();

}

function category() {
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var selectCategory = document.getElementById("selectCategory[" + itemNumber + "]");

    for (itemCategory in stock.currentStock) {
        selectCategory.innerHTML += "<option value='" + itemCategory + "'>" + itemCategory + "</option>";
    }
}

function selectItem() {
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var itemCategory = document.getElementById("selectCategory[" + itemNumber + "]").value;
    var selectItem = document.getElementById("selectItem[" + itemNumber + "]");
    selectItem.disabled = false;
    selectItem.innerHTML = "<option>Select Item</option>";

    for (item in stock.currentStock[itemCategory]) {
        selectItem.innerHTML += "<option value='" + item + "'>" + item + "</option>";
    }
}

function selectSubItem() {
    console.log(itemNumber);
    var itemCategory = document.getElementById("selectCategory[" + itemNumber + "]").value;

    if (itemCategory == "clothes") {
        var data = localStorage.getItem("stock");
        var stock = JSON.parse(data);

        var subCategory = document.getElementById("selectItem[" + itemNumber + "]").value;
        var selectItem = document.getElementById("selectSubCategory[" + itemNumber + "]");
        selectItem.innerHTML = "<option>Select Item</option>";
        selectItem.style.visibility = "visible";

        for (item in stock.currentStock[itemCategory][subCategory]) {
            selectItem.innerHTML += "<option value='" + item + "'>" + item + "</option>";
        }
    }

}

function quantity() {
    document.getElementById("quantity[" + itemNumber + "]").disabled = false;
    console.log(category, subCategory, selectItem.value);

}

function submitList() {
    if (document.getElementById("quantity[" + itemNumber + "]").value == "") {
        alert("Quantity cannot be left empty");

    }
    var itemCategory = document.getElementsByClassName("selectCategory").value;
    var subCategory = document.getElementsByClassName("selectItem").value;
    console.log("qw", subCategory);
    for (a in subCategory) {
        console.log("value", a);

    }
}