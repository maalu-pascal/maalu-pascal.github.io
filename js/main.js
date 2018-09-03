alert("home");
window.onload = function (event) {
    alert("home");
    document.getElementById('login').style.display = 'none';
}

function submitUser() {
    var userName = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;

    fetch('../json/login.json')
        .then(res => res.json())
        .then((out) => {
            console.log('Output: ', out[userName]);
            if (out[userName] === userPassword) {
                window.location.assign("../../home/html/home.html");
            } else {
                alert("Invalid Username/Password");
            }
        }).catch(err => console.error(err));

}


function home() {

    var login = document.getElementsByClassName('login');
    document.getElementById('login').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    login.style.display = none;
}

function login() {
    var login = document.getElementById('welcome');
    login.style.display = 'none';
    document.getElementById('login').style.display = 'block';
    
}

