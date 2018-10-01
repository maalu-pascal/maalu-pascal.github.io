/**
 * Calculates the total from the corresponding inventory category.
 * 
 * @param category - Category in the inventory.
 * @param inventoryList -inbound/outbound.
 */
function calculateTotal(category, inventoryList) {
    let inventory_category = 0;
    categoryInbounds = inventoryList.map(inventoryList => inventoryList.inventory[category]);
    for (inventoryCategory of categoryInbounds) {
        if (inventoryCategory) {
            inventory_category += parseInt(Object.values(inventoryCategory).reduce(reducer));
        }
    }
    return inventory_category;
}

/**
 * The current stock is read from the localStorage.
 * Total current food, medicines, toiletries and clothes is calculated.
 * The inbound and outbound is read from the localStorage.
 * Total food, medicines, toiletries and clothes in inbound and outbound is calculated separately.
 * 
 * The calculated values are then populated into the graph.
 */
function loadChart() {
    changeActiveSideBar('dashboard');
    let ctx = document.getElementById("myChart").getContext('2d');

    //Calculating the current status of total food, medicine,clothes and toiletries.
    let stock = JSON.parse(localStorage.getItem("stock"));

    let current_food = Object.values(stock.currentStock.food).reduce(reducer);
    let current_medicines = Object.values(stock.currentStock.medicines).reduce(reducer);
    let current_toiletries = Object.values(stock.currentStock.toiletries).reduce(reducer);
    let current_clothes = 0;
    for (item in stock.currentStock.clothes) {
        current_clothes += Object.values(stock.currentStock.clothes[item]).reduce(reducer);
    }

    //Calculating the total inbound of food, medicine,clothes and toiletries.
    let inboundList = JSON.parse(localStorage.getItem("inbound"));

    let inbound_food = calculateTotal('food', inboundList);
    let inbound_toileteries = calculateTotal('toiletries', inboundList);
    let inbound_medicines = calculateTotal('medicines', inboundList);

    let inbound_clothes = 0;
    clothesInbound = inboundList.map(inboundList => inboundList.inventory.clothes);
    for (inventorycategory of clothesInbound) {
        for (subcategory in inventorycategory) {
            inbound_clothes += parseInt(Object.values(inventorycategory[subcategory]).reduce(reducer));
        }
    }

    //Calculating the total number of outbound - food, medicine,clothes and toiletries.
    let outboundList = JSON.parse(localStorage.getItem("outbound"));

    let outbound_food = calculateTotal('food', outboundList);
    let outbound_toileteries = calculateTotal('toiletries', outboundList);
    let outbound_medicines = calculateTotal('medicines', outboundList);

    let outbound_clothes = 0;
    clothesInbound = outboundList.map(outboundList => outboundList.inventory.clothes);
    for (inventorycategory of clothesInbound) {
        for (subcategory in inventorycategory) {
            outbound_clothes += parseInt(Object.values(inventorycategory[subcategory]).reduce(reducer));
        }
    }

    const purple = 'rgba(153, 102, 255, 1)';
    const darkPurple = 'rgba(137, 79, 255,1)';
    const blue = 'rgba(103, 155, 191, 1)';
    const darkBlue = 'rgba(54, 162, 235, 1)';
    const green = 'rgba(105, 173, 118, 1)';
    const darkGreen = 'rgba(75, 168, 93,1)';
    const black = 'rgba(0,0,0,1)';

    let currentStock = {
        label: 'Current Stock',
        data: [current_food, current_clothes, current_toiletries, current_medicines],
        backgroundColor: [purple, purple, purple, purple],
        borderColor: [darkPurple, darkPurple, darkPurple, darkPurple],
        borderWidth: 1
    };

    let inboundStock = {
        label: 'Inbound Stock',
        data: [inbound_food, inbound_clothes, inbound_toileteries, inbound_medicines],
        backgroundColor: [blue, blue, blue, blue],
        borderColor: [darkBlue, darkBlue, darkBlue, darkBlue],
        borderWidth: 1
    };

    let outboundStock = {
        label: 'Outbound Stock',
        data: [outbound_food, outbound_clothes, outbound_toileteries, outbound_medicines],
        backgroundColor: [green, green, green, green],
        borderColor: [darkGreen, darkGreen, darkGreen, darkGreen],
        borderWidth: 1
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Food", "Clothes", "Toiletries", "Medicines"],
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