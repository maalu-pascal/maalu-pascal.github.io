function dashboard() {
    containerContent('dashboard/html/dashboard.html');
    document.getElementById("dashboard").focus();
    loadChart();
}

/**
 * Calculates the total from the corresponding inventory category.
 * 
 * @param category - Category in the inventory.
 * @param inventoryList -inbound/outbound.
 */
function calculateTotal(category, inventoryList) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
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
    let ctx = document.getElementById("myChart").getContext('2d');

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    //Calculating the current status of total food, medicine,clothes and toiletries.
    let data = localStorage.getItem("stock");
    let stock = JSON.parse(data);

    let current_food = Object.values(stock.currentStock.food).reduce(reducer);
    let current_medicines = Object.values(stock.currentStock.medicines).reduce(reducer);
    let current_toiletries = Object.values(stock.currentStock.toiletries).reduce(reducer);
    let current_clothes = 0;
    for (item in stock.currentStock.clothes) {
        current_clothes += Object.values(stock.currentStock.clothes[item]).reduce(reducer);
    }

    //Calculating the total inbound of food, medicine,clothes and toiletries.
    let inboundList = localStorage.getItem("inbound");
    inboundList = JSON.parse(inboundList);

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
    let outboundList = localStorage.getItem("outbound");
    outboundList = JSON.parse(outboundList);

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

    let currentStock = {
        label: 'Current Stock',
        data: [current_food, current_clothes, current_toiletries, current_medicines],
        backgroundColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    };

    let inboundStock = {
        label: 'Inbound Stock',
        data: [inbound_food, inbound_clothes, inbound_toileteries, inbound_medicines],
        backgroundColor: [
            'rgba(103, 155, 191, 1)',
            'rgba(103, 155, 191, 1)',
            'rgba(103, 155, 191, 1)',
            'rgba(103, 155, 191, 1)'
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
    };

    let outboundStock = {
        label: 'Outbound Stock',
        data: [outbound_food, outbound_clothes, outbound_toileteries, outbound_medicines],
        backgroundColor: [
            'rgba(105, 173, 118, 1)',
            'rgba(105, 173, 118, 1)',
            'rgba(105, 173, 118, 1)',
            'rgba(105, 173, 118, 1)'
        ],
        borderColor: [
            'rgba(75, 168, 93,1)',
            'rgba(75, 168, 93,1)',
            'rgba(75, 168, 93,1)',
            'rgba(75, 168, 93,1)'
        ],
        borderWidth: 1
    };

    let myChart = new Chart(ctx, {
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
                        fontColor: "#000",
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#000",
                    }
                }]
            },
            responsive: false
        }
    });
}
