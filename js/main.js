window.onload = function (event) {
    var status = localStorage.getItem("userStatus");
    nav(localStorage.getItem("userStatus"));
    if (status == "logged-in") {
        containerContent('../dashboard/html/dashboard.html');
    } else {
        containerContent('../welcome/html/welcome.html');
    }
}
function nav(status) {
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