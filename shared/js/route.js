const routes = [
    {
        html: 'welcome/html/welcome.html',
        javascriptFunction: '',
        name: 'welcome',
        script: '.',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="welcome/css/welcome.css" />',
        url: 'welcome'
    },
    {
        html: 'login/html/login.html',
        javascriptFunction: 'checkSubmit',
        name: 'login',
        script: 'login/js/login.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="login/css/login.css" />',
        url: 'login'
    },
    {
        html: 'dashboard/html/dashboard.html',
        javascriptFunction: 'loadChart',
        name: 'dashboard',
        script: 'dashboard/js/dashboard.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="dashboard/css/dashboard.css" />',
        url: 'dashboard'
    },
    {
        html: 'current-stock/html/current-stock.html',
        javascriptFunction: 'displayCurrentStock',
        name: 'current-stock',
        script: 'current-stock/js/current-stock.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="current-stock/css/current-stock.css" />',
        url: 'current-stock'
    },
    {
        html: 'inbound/inbound-list/html/inbound-list.html',
        javascriptFunction: 'inventory',
        name: 'inbound',
        script: 'shared/js/inventory-list.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-list.css" />',
        url: 'inbound'
    },
    {
        html: 'inbound/new-inbound/html/new-inbound.html',
        javascriptFunction: 'createNewInventory',
        name: 'new-inbound',
        script: 'shared/js/new-inventory.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/new-inventory.css" />',
        url: 'inbound/new-inbound'
    },
    {
        html: 'inbound/inbound-product-list/html/inbound-product-list.html',
        javascriptFunction: 'productList',
        name: 'inbound-product-list',
        script: 'shared/js/inventory-product-list.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-product-list.css" />',
        url: 'inbound/inbound-product-list'
    },
    {
        html: 'outbound/outbound-list/html/outbound-list.html',
        javascriptFunction: 'inventory',
        name: 'outbound',
        script: 'shared/js/inventory-list.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-list.css" />',
        url: 'outbound'
    },
    {
        html: 'outbound/new-outbound/html/new-outbound.html',
        javascriptFunction: 'createNewInventory',
        name: 'new-outbound',
        script: 'shared/js/new-inventory.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/new-inventory.css" />',
        url: 'outbound/new-outbound'
    },
    {
        html: 'outbound/outbound-product-list/html/outbound-product-list.html',
        javascriptFunction: 'productList',
        name: 'outbound-product-list',
        script: 'shared/js/inventory-product-list.js',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-product-list.css" />',
        url: 'outbound/outbound-product-list'
    }
];

/**
 * Page redirection.
 * 
 * @param name - name of the page to which the redirection should take place.
 * @param inventoryType - inbound/outbound
 * @param inventoryName - The name of the inventory whose product list is to be viewed.
 * @param inventoryDate - The date of the inventory whose product list is to be viewed.
 */
function redirectTo(name, inventoryType, inventoryName, inventoryDate) {
    //Route details are read.
    var route = routes.filter(function (newRoute) { return newRoute.name === name })[0];

    //url is changed.
    window.history.pushState(route.name, `state${route.name}`, `#${route.url}`);

    //load the required CSS files.
    document.getElementById("styles").innerHTML = route.style;

    //The corresponding html section is rendered.
    containerContent(route.html);

    //The corresponding script file is loaded.
    let parent = document.getElementById("JSscripts");
    let childScript = document.createElement("script");
    childScript.src = route.script;
    childScript.onload = function () {
        //inventoryName, inventoryDate is only for the function redirectTo('inventory-product-list').
        if (route.javascriptFunction) window[route.javascriptFunction](inventoryType, inventoryName, inventoryDate);
    }
    parent.innerHTML = '';
    parent.appendChild(childScript);
}

