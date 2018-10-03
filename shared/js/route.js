const routes = [
    {
        name: 'welcome',
        path: 'welcome/html/welcome.html',
        javascriptFunction: '',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="welcome/css/welcome.css" />',
        url: 'welcome'
    },
    {
        name: 'login',
        path: 'login/html/login.html',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="login/css/login.css" />',
        javascriptFunction: 'checkSubmit',
        url: 'login'
    },
    {
        name: 'dashboard',
        path: 'dashboard/html/dashboard.html',
        javascriptFunction: 'loadChart',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="dashboard/css/dashboard.css" />',
        url: 'dashboard'
    },
    {
        name: 'current-stock',
        path: 'current-stock/html/current-stock.html',
        javascriptFunction: 'displayCurrentStock',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="current-stock/css/current-stock.css" />',
        url: 'current-stock'
    },
    {
        name: 'inbound',
        path: 'inbound/inbound-list/html/inbound-list.html',
        javascriptFunction: 'inventory',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-list.css" />',
        url: 'inbound'
    },
    {
        name: 'new-inbound',
        path: 'inbound/new-inbound/html/new-inbound.html',
        javascriptFunction: 'createNewInventory',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/new-inventory.css" />',
        url: 'inbound/new-inbound'
    },
    {
        name: 'inbound-product-list',
        path: 'inbound/inbound-product-list/html/inbound-product-list.html',
        javascriptFunction: 'productList',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-product-list.css" />',
        url: 'inbound/inbound-product-list'
    },
    {
        name: 'outbound',
        path: 'outbound/outbound-list/html/outbound-list.html',
        javascriptFunction: 'inventory',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/inventory-list.css" />',
        url: 'outbound'
    },
    {
        name: 'new-outbound',
        path: 'outbound/new-outbound/html/new-outbound.html',
        javascriptFunction: 'createNewInventory',
        style: '<link rel="stylesheet" type="text/css" media="screen" href="shared/css/new-inventory.css" />',
        url: 'outbound/new-outbound'
    },
    {
        name: 'outbound-product-list',
        path: 'outbound/outbound-product-list/html/outbound-product-list.html',
        javascriptFunction: 'productList',
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
    var route = routes.filter(function (r) { return r.name === name })[0];

    //url is changed.
    window.history.pushState(route.name, `state${route.name}`, `#${route.url}`);

    //load the required CSS files.
    document.getElementById("styles").innerHTML = route.style;

    //The corresponding html section is rendered.
    containerContent(route.path);
    
    //inventoryName, inventoryDate is only for redirectTo('inventory-product-list').
    if (route.javascriptFunction) window[route.javascriptFunction](inventoryType, inventoryName, inventoryDate);    
}
