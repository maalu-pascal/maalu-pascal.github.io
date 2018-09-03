
window.onload = function (event) {
    home();
}

function home() {
    req = new XMLHttpRequest();
    req.open("GET", "main.html", false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}

function login() {
    req = new XMLHttpRequest();
    req.open("GET", "../login/html/login.html", false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;

}

