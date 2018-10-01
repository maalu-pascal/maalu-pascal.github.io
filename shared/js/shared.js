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
    if (!localStorage.getItem("inbound")) localStorage.setItem("inbound", "[]");
    if (!localStorage.getItem("outbound")) localStorage.setItem("outbound", "[]");

    changeNavigationBar(UserStatus);
    (UserStatus == "logged-in") ? redirectTo("dashboard") : redirectTo("welcome");
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
