/**
 * Event listener is added for the login password input field.
 * When the enter key is pressed in the login page, the submit button is clicked.
 * 
 * @param e - key up event.
 */
function checkSubmit(e) {
    let input = document.getElementById("userpassword");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit").click();
            validateUser();
        }
    });

}

/**
 * Validation is done when the user submits username and password.
 */
function validateUser() {
    let userName = document.getElementById("username").value;
    let userPassword = document.getElementById("userpassword").value;
    let userFound = 0;
    let errorMessage;
    if (userName == "" || userPassword == "") {
        errorMessage = "*Please enter username/password";
        document.getElementById("errorMessage").innerHTML = errorMessage;
    } else {
        fetch('login/json/login.json')
            .then(res => res.json())
            .then((out) => {
                for (element of out.users) {
                    if ((element.username === userName) && (element.password === userPassword)) {
                        userFound = 1;
                        login();
                        break;
                    }
                }
                if (!userFound) {
                    errorMessage = "*Invalid username/password";
                    document.getElementById("errorMessage").innerHTML = errorMessage;
                }
            }).catch(err => console.error(err));
    }
}

/**
 * This function is called when the login process is a success.
 * The status of the user is set to logged-in in the local storage.
 * The necessary changes are made in the navvigation bar.
 * Function to load the dashboard is called.
 */
function login() {
    localStorage.setItem("userStatus", "logged-in");
    changeNavigationBar('logged-in');
    redirectTo("dashboard");
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
