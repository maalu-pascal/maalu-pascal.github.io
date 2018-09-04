function submitUser() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;

    fetch('../login/json/login.json')
        .then(res => res.json())
        .then((out) => {
            console.log('Output: ', out[userName]);
            if (out[userName] === userPassword) {
                home();
            } else {
                alert("Invalid Username/Password");
            }
        }).catch(err => console.error(err));
}
