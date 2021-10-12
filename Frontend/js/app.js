
function ajax() {
    event.preventDefault();
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register",);

    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById('formulario').style.display = 'none'
            document.getElementById('mensaje').style.display = 'block'
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        }

        if (this.readyState == 4 && this.status == 401) {
            document.getElementById('RegisterInvalidEmail').style.display = "block";
        }
    }

    var data = {
        Nombre: document.getElementById('_nombre').value,
        Email: document.getElementById('_email').value,
        Contrasena: document.getElementById('_contrasena').value
    }

    xhttp.send(JSON.stringify(data));
}

function ajaxlog() {

    //Divs Alerts:
    event.preventDefault();
    const InvalidEmail = document.getElementById('InvalidEmail');
    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/login",);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            localStorage.setItem("tokens", JSON.stringify({
                accessToken: JSON.parse(xhttp.response).accessToken
            })),
                document.getElementById('LogInFormulario').style.display = 'none'
            document.getElementById('GotoInventory').style.display = 'block'
            setTimeout(() => {
                window.location.href = '/usuarios'
            }, 3000);

        }

        if (this.readyState == 4 && this.status == 401) {
            InvalidEmail.style.display = "block";
        }


    }

    const data = {

        Email: document.getElementById('_email').value,
        Contrasena: document.getElementById('_contrasena').value
    }

    xhttp.send(JSON.stringify(data));
}

function GetUser() {

    event.preventDefault();
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/get-user",);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            res.json({ msj: "Todo Correcto" });
        }
    }


}

function UsersRequest(){

    event.preventDefault();
    const xhttp = new XMLhttpRequest();
    xhttp.open("GET", "/users");
    xhttp.onreadystatechange = function(){

        if (this.readyState = 4 && this.status == 200){
            GetUser()
        }

    }
}

function TablaUsuarios(usertb){

const tbody = document.getElementById("t-body");
    
usertb.forEach((usertb, i) => {

const tableRow = document.createElement('tr');
const tableHeader= document.createElement('th');
tableHeader.scope = "row";
tableHeader.innerHTML = i + 1;

})
}