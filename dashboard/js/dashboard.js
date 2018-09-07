function loadChart() {
    var ctx = document.getElementById("myChart").getContext('2d');

    var data = localStorage.getItem("stock");
    var stock = JSON.parse(data);

    var current_food = 0;
    var current_clothes = 0;
    var current_toiletries = 0;
    var current_medicines = 0;

    //Calculating the current status of total number of boxes of food.
    for (item in stock.currentStock.food) {
        current_food += stock.currentStock.food[item];
    }

    //Calculating the current status of total number of boxes of toiletries.
    for (item in stock.currentStock.toiletries) {
        current_toiletries += stock.currentStock.toiletries[item];
    }

    //Calculating the current status of total number of boxes medicine.
    for (item in stock.currentStock.medicine) {
        current_medicines += stock.currentStock.medicine[item];
    }

    //Calculating the current status of total number of boxes clothes.
    for (item in stock.currentStock.clothes) {
        for (cloth in stock.currentStock.clothes[item]) {

            current_clothes += stock.currentStock.clothes[item][cloth];
        }
    }

    var inbound_food = 25;
    var inbound_clothes = 15;
    var inbound_toileteries = 13;
    var inbound_medicines = 13;

    var outbound_food = 50;
    var outbound_clothes = 32;
    var outbound_toileteries = 12;
    var outbound_medicines = 12;

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
