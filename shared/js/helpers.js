
/**
 * An array of objects is created with the item-name as key, and its corresponding quantity as its value.
 * 
 * @param stocks - The object containg the item details.
 * @param path - The path through which the items can be accessed in the object.
 */
function arrayOfAllItems(stocks, path) {
    arrayOfItems = [];
    for (category in stocks[path]) {
        for (item in stocks[path][category]) {
            if (typeof (stocks[path][category][item]) == "object") {
                for (subCategoryItems in stocks[path][category][item]) {
                    let newObject = {};
                    newObject[subCategoryItems] = stocks[path][category][item][subCategoryItems];
                    arrayOfItems.push(newObject);
                }
            } else {
                let newItemObject = {};
                newItemObject[item] = stocks[path][category][item];
                arrayOfItems.push(newItemObject);
            }
        }
    }
}
