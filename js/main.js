window.onload = function (event) {
    containerContent('../welcome/html/welcome.html');
}

function containerContent(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementById("content").innerHTML = req.responseText;
}