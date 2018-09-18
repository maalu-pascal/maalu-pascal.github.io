window.onload = function (event) {

    //Loading the necessary initial data into the local storage.
    if (!localStorage.getItem("userStatus")) {
        localStorage.setItem("userStatus", "logged-out");
    }
    if (!localStorage.getItem("stock")) {
        var data = fetch('../dashboard/json/dashboard.json')
            .then(res => res.json())
            .then((out) => {
                var stock = JSON.stringify(out);
                localStorage.setItem("stock", stock);
            }).catch(err => console.error(err));
    }
    if(!localStorage.getItem("inbound")) {
        localStorage.setItem("inbound", "[]");

    }

    if(!localStorage.getItem("outbound")) {
        localStorage.setItem("outbound", "[]");

    }

    var status = localStorage.getItem("userStatus");
    changeNavigationBar(localStorage.getItem("userStatus"));
    if (status == "logged-in") {
        containerContent('../dashboard/html/dashboard.html');
        loadChart();

    } else {
        containerContent('../welcome/html/welcome.html');
    }
}

function changeNavigationBar(status) {
    if (status == "logged-in") {
        document.getElementById("home").style.display = "none";
        document.getElementById("loginButton").style.display = "none";

        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("side-nav").style.display = "block";

    } else {
        document.getElementById("home").style.display = "block";
        document.getElementById("loginButton").style.display = "block";

        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("side-nav").style.display = "none";
    }
}

function containerContent(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}

function dashboard() {
    containerContent('../dashboard/html/dashboard.html');
    loadChart();
}