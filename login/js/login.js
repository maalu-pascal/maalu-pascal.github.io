function submitUser() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;
    var userFound = 0;
    fetch('../login/json/login.json')
        .then(res => res.json())
        .then((out) => {
            out.users.forEach(element => {

                if ((element.username === userName) && (element.password === userPassword)) {
                    userFound = 1;
                    containerContent('../home/html/home.html');
                }
            }
            );
            if (!userFound) {
                alert("Invalid Username/Password");
            }
        }).catch(err => console.error(err));
}
