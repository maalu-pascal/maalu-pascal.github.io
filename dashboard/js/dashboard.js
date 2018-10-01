/**
 * Calculates the total from the corresponding inventory category.
 * 
 * @param category - Category in the inventory.
 * @param inventoryList -inbound/outbound.
 */
function calculateTotal(category, inventoryList) {
    let inventory_category = 0;
    let categoryInbounds = inventoryList.map(inventoryList => inventoryList.inventory[category]);

    for (let inventoryCategory of categoryInbounds) {
        if (typeof (Object.values(inventoryCategory)[0]) == "object") {
            for ( let subcategory in inventoryCategory) {
                inventory_category += parseInt(Object.values(inventoryCategory[subcategory]).reduce(reducer));
            }
        } else {
            inventory_category += parseInt(Object.values(inventoryCategory).reduce(reducer));
        }
    }
    return inventory_category;
}

/**
 * The current stock object is read from the localStorage.
 * Total current food, medicines, toiletries and clothes is calculated.
 * The inbound and outbound arrays are read from the localStorage.
 * Total food, medicines, toiletries and clothes in inbound and outbound is calculated separately.
 * The calculated values are then populated into the graph.
 */
function loadChart() {
    changeActiveSideBar('dashboard');
    let ctx = document.getElementById("myChart").getContext('2d');

    //Calculating the current status of total food, medicine,clothes and toiletries.
    let stock = JSON.parse(localStorage.getItem("stock"));
    let current_stock = {};
    for (let category in stock.currentStock) {
        if (typeof (Object.values(stock.currentStock[category])[0]) == "object") {  //Checking for Subcategory
            current_stock[category] = 0;
            for ( let subcategory in stock.currentStock[category]) {
                current_stock[category] += Object.values(stock.currentStock[category][subcategory]).reduce(reducer);
            }
        } else {
            current_stock[category] = Object.values(stock.currentStock[category]).reduce(reducer);
        }
    }

    //Array of all category names.
    let categories = Object.keys(stock.currentStock);

    //Calculating the total inbound of food, medicine,clothes and toiletries.
    let inboundList = JSON.parse(localStorage.getItem("inbound"));
    let inbound_stock = {};
    categories.forEach((category) => {inbound_stock[category] = calculateTotal(category, inboundList);});

    //Calculating the total number of outbound - food, medicine,clothes and toiletries.
    let outboundList = JSON.parse(localStorage.getItem("outbound"));
    let outbound_stock = {};
    categories.forEach((category)=> { outbound_stock[category] = calculateTotal(category, outboundList);});

    //Initialising colours for bar-graph.
    const purple = 'rgba(153, 102, 255, 1)';
    const darkPurple = 'rgba(137, 79, 255,1)';
    const blue = 'rgba(103, 155, 191, 1)';
    const darkBlue = 'rgba(54, 162, 235, 1)';
    const green = 'rgba(105, 173, 118, 1)';
    const darkGreen = 'rgba(75, 168, 93,1)';
    const black = 'rgba(0,0,0,1)';

    let currentStock = {
        label: 'Current Stock',
        data: Object.values(current_stock),
        backgroundColor: [purple, purple, purple, purple],
        borderColor: [darkPurple, darkPurple, darkPurple, darkPurple],
        borderWidth: 1
    };

    let inboundStock = {
        label: 'Inbound Stock',
        data: Object.values(inbound_stock),
        backgroundColor: [blue, blue, blue, blue],
        borderColor: [darkBlue, darkBlue, darkBlue, darkBlue],
        borderWidth: 1
    };

    let outboundStock = {
        label: 'Outbound Stock',
        data: Object.values(outbound_stock),
        backgroundColor: [green, green, green, green],
        borderColor: [darkGreen, darkGreen, darkGreen, darkGreen],
        borderWidth: 1
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [currentStock, inboundStock, outboundStock]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: black,
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: black,
                    }
                }]
            },
            responsive: true
        }
    });
}