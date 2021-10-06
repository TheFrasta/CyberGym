function ajax() {
    event.preventDefault();
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register");

    xhttp.setRequestHeader('Content-Type','application/json')
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById('formulario').style.display = 'none'
            document.getElementById('mensaje').style.display = 'block'
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        }
    }

    var data = {
        Nombre      : document.getElementById('_nombre').value,
        Email       : document.getElementById('_email').value,
        Contrasena  : document.getElementById('_contrasena').value
    }

    xhttp.send(JSON.stringify(data));
}
