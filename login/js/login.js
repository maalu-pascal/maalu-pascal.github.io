function submitUser() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;
    var userFound = 0;
    var errorMessage;
    if (userName == "" || userPassword == "") {
        errorMessage = "*Please enter username/password";
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
