function submitUser() {
    alert("login");
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;

    fetch('../json/login.json')
        .then(res => res.json())
        .then((out) => {
            console.log('Output: ', out[userName]);
            if (out[userName] === userPassword) {
                alert("Invalid Username/Password");
                window.location.assign("../../home/html/home.html");
            } else {
                alert("Invalid Username/Password");
            }
        }).catch(err => console.error(err));
}
