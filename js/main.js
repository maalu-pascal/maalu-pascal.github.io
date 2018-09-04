window.onload = function (event) {
    containerContent('../welcome/html/welcome.html');
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

function containerContent(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}