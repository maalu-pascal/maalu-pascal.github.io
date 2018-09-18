function loadChart() {
    var ctx = document.getElementById("myChart").getContext('2d');

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    //Calculating the current status of total number of food, medicine,clothes and toiletries.

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    var current_food = Object.values(stock.currentStock.food).reduce(reducer);
    var current_medicines = Object.values(stock.currentStock.medicines).reduce(reducer);
    var current_toiletries = Object.values(stock.currentStock.toiletries).reduce(reducer);
    var current_clothes = 0;
    for (item in stock.currentStock.clothes) {
        current_clothes += Object.values(stock.currentStock.clothes[item]).reduce(reducer);
    }

    //Calculating the total number of inbound - food, medicine,clothes and toiletries.
    var inboundList = localStorage.getItem("inbound");
    inboundList = JSON.parse(inboundList);
    
    function calcucalateTotal(category, inventoryList) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        var inventory_category = 0;
        categoryInbounds = inventoryList.map(inventoryList => inventoryList.inventory[category]);
        for (inventoryCategory of categoryInbounds) {
            if (inventoryCategory) {
                inventory_category += parseInt(Object.values(inventoryCategory).reduce(reducer));
            }
        }
        return inventory_category;
    }

    var inbound_food = calcucalateTotal('food', inboundList);
    var inbound_toileteries = calcucalateTotal('toiletries', inboundList);
    var inbound_medicines = calcucalateTotal('medicines', inboundList);

    var inbound_clothes = 0;
    clothesInbound = inboundList.map(inboundList => inboundList.inventory.clothes);
    for (inventorycategory of clothesInbound) {        
        for (subcategory in inventorycategory) {
            inbound_clothes += parseInt(Object.values(inventorycategory[subcategory]).reduce(reducer));
        }
    }

    //Calculating the total number of outbound - food, medicine,clothes and toiletries.
    var outboundList = localStorage.getItem("outbound");
    outboundList = JSON.parse(outboundList);

    var outbound_food = calcucalateTotal('food', outboundList);
    var outbound_toileteries = calcucalateTotal('toiletries', outboundList);
    var outbound_medicines = calcucalateTotal('medicines', outboundList);

    var outbound_clothes = 0;
    clothesInbound = outboundList.map(outboundList => outboundList.inventory.clothes);
    for (inventorycategory of clothesInbound) {        
        for (subcategory in inventorycategory) {
            inbound_clothes += parseInt(Object.values(inventorycategory[subcategory]).reduce(reducer));
        }
    }
    var currentStock = {
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

    var inboundStock = {
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

    var outboundStock = {
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

    var myChart = new Chart(ctx, {
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
