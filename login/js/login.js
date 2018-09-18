function loginPage() {
    containerContent('../login/html/login.html');
    checkSubmit();
}
function submitUser() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;
    var userFound = 0;
    var errorMessage;
    if (userName == "" || userPassword == "") {
        // alert("Please enter username/password");
        errorMessage = "*Please enter username/password";
        // document.getElementById("errorMessage").innerHTML="Please enter username/password";
        document.getElementById("errorMessage").innerHTML = errorMessage;
    } else {
        fetch('../login/json/login.json')
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
    nav('logged-in');
    containerContent('../dashboard/html/dashboard.html');
}

function checkSubmit(e) {
    var input = document.getElementById("userpassword");
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
    nav('logged-out');
    containerContent('../login/html/login.html')
}