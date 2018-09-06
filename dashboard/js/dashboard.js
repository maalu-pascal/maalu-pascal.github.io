navContent('../dashboard/html/dashboard.html');

function navContent(url) {
    req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    document.getElementsByClassName("content").innerHTML = req.responseText;
}