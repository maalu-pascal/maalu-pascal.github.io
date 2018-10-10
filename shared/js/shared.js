window.onload = function (event) {

    //Check if localstorage is supported. 
    if (typeof (Storage) !== "undefined") {
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
        if (!localStorage.getItem("inbound")) localStorage.setItem("inbound", "[]");
        if (!localStorage.getItem("outbound")) localStorage.setItem("outbound", "[]");

        changeNavigationBar(UserStatus);
        (UserStatus == "logged-in") ? redirectTo("dashboard") : redirectTo("welcome");
    } else {
        changeNavigationBar();
        document.getElementById("content").innerHTML = `<h2 style="background:black; color: white;" align="center"><b>*Please update your browser to use this page<b></h2>`;
    }
}

/**
 * The display of the navigation bar is changed according to the user status.
 * 
 * @param UserStatus - logged-in/logged-out.
 */
function changeNavigationBar(UserStatus) {
    let signedIn = document.getElementsByClassName("signed-in");
    let display = (UserStatus == "logged-in") ? "block" : "none";
    for (element of signedIn) element.style.display = display;

    let contentDiv = document.getElementById("content");
    let width = (UserStatus == "logged-in") ? "84%" : "100%";
    contentDiv.style.width = width;
}

/**
 * An active class is added to the active button, and the active class is removed from all the other buttons.
 * 
 * @param choice - The name of the active button
 */
function changeActiveSideBar(choice) {
    let options = ['dashboard', 'inbound', 'outbound', 'currentStock'];
    for (let option of options) {
        (option == choice) ? document.getElementById(choice).classList.add("active")
            : document.getElementById(option).classList.remove("active");
    }
}

/**
 * The html file from the path is appended to the content div.
 * 
 * @param path - path to the html page to be loaded.
 */
function containerContent(path) {
    req = new XMLHttpRequest();
    req.open("GET", path, false);
    req.send();
    document.getElementById("content").innerHTML = req.responseText;
}

/**
 * The user status is set to logged-out in th localStorage.
 * The view is changed by changing the side and top navigation bar.
 * Page is redirected to login.
 */
function logout() {
    localStorage.setItem("userStatus", "logged-out");
    changeNavigationBar('logged-out');
    redirectTo("login");
}