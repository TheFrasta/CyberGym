
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
        Nombre:     document.getElementById('_nombre').value,
        Email:      document.getElementById('_email').value,
        Contrasena: document.getElementById('_contrasena').value
    }

    xhttp.send(JSON.stringify(data));
}

function ajaxlog() {

    //Divs Alerts:
    event.preventDefault();
    const InvalidEmail = document.getElementById('InvalidEmail');
    const xhttp = new XMLHttpRequest();

    xhttp.open            ("POST", "/login",);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById('LogInFormulario').style.display = 'none'
            document.getElementById('GotoInventory').style.display = 'block'
            setTimeout(() => {
                window.location.href = '/myhome'
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
