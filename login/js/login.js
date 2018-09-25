function loginPage() {
    containerContent('login/html/login.html');
    checkSubmit();
}

function submitUser() {
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

function login() {
    localStorage.setItem("userStatus", "logged-in");
    changeNavigationBar('logged-in');
    dashboard();
}

function checkSubmit(e) {
    let input = document.getElementById("userpassword");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("submit").click();
            submitUser();
        }
    });

}

function logout() {
    localStorage.setItem("userStatus", "logged-out");
    changeNavigationBar('logged-out');
    containerContent('login/html/login.html')
}
