//dynamically creating <select> and <options>


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
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var insertItems = document.getElementById("selectOptions");

    var itemCategory = document.createElement("select");
    itemCategory.id = "selectCategory["+itemNumber+"]";
    insertItems.appendChild(itemCategory);

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
    document.getElementById("selectCategory["+itemNumber+"]").addEventListener("change", selectItem);


}

function selectItem() {
    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var insertItems = document.getElementById("selectOptions");
 
    var itemCategory = document.getElementById("selectCategory["+itemNumber+"]");
    console.log("selectCategory["+itemNumber+"]");

   


    var items = document.createElement("select");
    items.id = "selectItem["+itemNumber+"]";
    insertItems.appendChild(items);

    var option = document.createElement("option");
    option.text = "Select item";
    option.value = "";
    items.appendChild(option);

    for (item in stock.currentStock[itemCategory.value]) {
        var option = document.createElement("option");
        option.text = item;
        option.value = item;
        items.appendChild(option);
    }
    document.getElementById("selectItem["+itemNumber+"]").addEventListener("change", selectSubItem);

}

function selectSubItem() {
    var itemCategory = document.getElementById("selectCategory["+itemNumber+"]").value;
    var subCategory = document.getElementById("selectItem["+itemNumber+"]").value;
    var insertsubCategoryItem = document.getElementById("selectOptions");

    console.log("success");
    if (itemCategory == "clothes") {
        console.log(itemCategory);
        var data = localStorage.getItem("stock");
        var stock = JSON.parse(data);

        var items = document.createElement("select");
        items.id = "selectSubCategoryItem["+itemNumber+"]";
        insertsubCategoryItem.appendChild(items);

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
        document.getElementById("selectSubCategoryItem["+itemNumber+"]").addEventListener("change", quantity);


    } else {
        quantity();
    }
}

function quantity() {
    var insertQuantity = document.getElementById("selectOptions");

    var itemQuantity = document.createElement("input");
    itemQuantity.id = "quantity";
    itemQuantity.placeholder = "Enter quantity of item";
    insertQuantity.appendChild(itemQuantity);

}

function newItem() {
    if ((document.getElementById("selectCategory["+itemNumber+"]").value == "")) {// || (document.getElementById("selectItem") == null) || (document.getElementById("selectSubCategoryItem") == null)) {
        alert("Please choose an input");

    } else {
        if (document.getElementById("quantity").value == "") {
            alert("Quantity cannot be left empty");
        } else {

            var itemCategory = document.getElementById("selectCategory["+itemNumber+"]").value;
            var item = document.getElementById("selectItem["+itemNumber+"]").value;
            // var subCategoryItem = document.getElementById("selectSubCategoryItem").value;
        }

        var itemQuantity = document.getElementById("quantity").value;
        
        for ( i = 0; i<=itemNumber ; i++) {
            console.log(document.getElementById("selectCategory["+i+"]").value);
        }

        
        console.log("qw", itemCategory, item, itemQuantity);
        itemNumber++;

        insertItem();


        // document.getElementById("selectCategory").selectedIndex = "0";
        // document.getElementById("selectItem").selectedIndex = "0";
        // document.getElementById("selectSubCategoryItem").selectedIndex = "0";
        // document.getElementById("quantity").value = "";

    }
}