window.onload = function (event) {
    let UserStatus = localStorage.getItem("userStatus");

    //Loading the necessary initial data into the local storage.
    if (!UserStatus) {
        localStorage.setItem("userStatus", "logged-out");
    }

    if (!localStorage.getItem("stock")) {
        var data = fetch('../shared/json/initial-stock.json')
            .then(res => res.json())
            .then((out) => {
                var stock = JSON.stringify(out);
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
        dashboard();
    } else {
        containerContent('../welcome/html/welcome.html');
    }
}

function changeNavigationBar(UserStatus) {
    let signedIn = document.getElementsByClassName("signed-in");
    let display;
    if (UserStatus == "logged-in") {
        display = "block";
    } else {
        display = "none";
    }
    for (element of signedIn) element.style.display = display;

}

function containerContent(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}