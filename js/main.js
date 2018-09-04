window.onload = function (event) {
    welcome();
}

function welcome() {
    req = new XMLHttpRequest();
    req.open("GET", "../welcome/html/welcome.html", false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}

function login() {
    req = new XMLHttpRequest();
    req.open("GET", "../login/html/login.html", false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}

function home() {
    req = new XMLHttpRequest();
    req.open("GET", "../home/html/home.html", false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}