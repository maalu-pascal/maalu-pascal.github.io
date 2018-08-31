// localStorage.setItem("maalup","123456");
var url = "../../home/html/home.html";

function submitUser() {
    var user = document.getElementById("username").value;
    var userPassword = document.getElementById("userpassword").value;

    // if (localStorage.getItem(user) === userPassword) {
    //     window.location = url;
    // } else {
    //     alert("Invalid Username/Password");
    // }

fetch('../json/login.json')
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
}).catch(err => console.error(err));

}
