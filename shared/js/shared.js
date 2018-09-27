window.onload = function (event) {
    let UserStatus = localStorage.getItem("userStatus");

    //Loading the necessary initial data into the local storage.
    if (!UserStatus) {
        localStorage.setItem("userStatus", "logged-out");
    }

    if (!localStorage.getItem("stock")) {
        let data = fetch('shared/json/initial-stock.json')
            .then(res => res.json())
            .then((out) => {
                let stock = JSON.stringify(out);
                localStorage.setItem("stock", stock);
            }).catch(err => console.error(err));
    }

    if (!localStorage.getItem("inbound")) {
        localStorage.setItem("inbound", "[]");
    }

    if (!localStorage.getItem("outbound")) {
        localStorage.setItem("outbound", "[]");
    }

    changeNavigationBar(UserStatus);
    if (UserStatus == "logged-in") {
        // changeLink("dashboard");
        dashboard();

    } else {
        containerContent('welcome/html/welcome.html');
    }

    // console.log(window.location.pathname);
    // var currentPath = window.location.pathname;
    // if (currentPath === '/Inventory-Management-System/index.html') {
    //     console.log('You are on the root page');
    // }
    // else {
    //     // var route = myFirstRouter.routes.filter(function (r) {
    //     //     return r.path === currentPath
    //     // })[0];

    //     let route = routess.filter(function (r) { console.log("q");
    //             return r.path === currentPath
    //         })[0];
    //     console.log(currentPath);
    //     console.log(route);

    // }
}

function redirectTo(name,inventoryType) {
    var route = routess.filter(function (r) {
        return r.name === name
    })[0];
    console.log(route);
    console.log(route.url);
    console.log(route.javascriptFunction);
    window.history.pushState(route.name, `state${route.name}`, `#${route.name}`);
    containerContent(route.url);
    window[route.javascriptFunction](inventoryType);
    //load the <script src> to head only when the function is called.
}

function test() {
    console.log("check");
}

function changeNavigationBar(UserStatus) {
    let signedIn = document.getElementsByClassName("signed-in");
    let display = (UserStatus == "logged-in") ? "block" : "none";
    for (element of signedIn) element.style.display = display;

}

function containerContent(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    document.getElementById("content").innerHTML = req.responseText;
}




function changeLink(choice) {
    var options = ['dashboard', 'inbound', 'outbound'];
    for (var option of options) {
        if (option == choice) {
            window.history.pushState(choice, `state${choice}`, `${choice}`);

        }
    }
}

function currentStock() {
    containerContent('current-stock/html/current-stock.html');
    displayCurrentStock();
}
