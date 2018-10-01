/**
 * To find the total of the series of numbers.
 * 
 * @param accumulator - The value to be added to the total.
 * @param currentValue - The current calculated total.
 */
const reducer = (accumulator, currentValue) => accumulator + currentValue;

var arrayOfItems = [];
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

/**
 * Calculates the aggregate of the item values.
 * 
 * @param categoryInventory -An array of objects where each object holds a set of key-value pairs(the items and its correspoding stock value).
 */
function calculateTotal(categoryInventory) {
    let category_total = 0;

    for (let inventoryCategory of categoryInventory) {
        if (typeof (Object.values(inventoryCategory)[0]) == "object") {
            for (let subcategory in inventoryCategory) {
                category_total += parseInt(Object.values(inventoryCategory[subcategory]).reduce(reducer));
            }
        } else {
            category_total += parseInt(Object.values(inventoryCategory).reduce(reducer));
        }
    }
    return category_total;
}

