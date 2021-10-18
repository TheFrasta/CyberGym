//Funcion para registrarse, envia los datos del usuario a la base de datos.
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
            console.log('PRUEBA');

            if (window.location.pathname == "/register") {
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
     

            } else if (window.location.pathname == "/usuarios") {

                var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModalCenter'));
                setTimeout(() => {

                    modal.hide();

                }, 3000);


            }


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

//Esta funcion es (Login), envia data al servidor y la compara.
function ajaxlog() {

    //Divs Alerts:
    event.preventDefault(); // Detener el envio del formulario.
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

//Si se cumple esto, tendria que lanzarme la informacion de la base datos.
if (window.location.pathname == '/usuarios') {

    (function GetUser() {

        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/get-user",);
        xhttp.setRequestHeader('Content-Type', 'application/json')

        const localtoken = JSON.parse(localStorage.getItem("tokens")).accessToken;
        xhttp.setRequestHeader('authenticate', localtoken);

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                const usersList = JSON.parse(xhttp.response).users
                TablaUsuarios(usersList);
                document.getElementById('addUserModal').classList.remove('d-none');

            }
        }

        xhttp.send();

    })();

}

if (window.location.pathname == '/usuarios') {

    function ModifyUser() {

        event.preventDefault();
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "/post-edituser");
        xhttp.setRequestHeader('Content-type', 'application/json')
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.tatus == 200){
                console.log(this.responseText);
                
            }
        }
    }


}

//Tabla de Usuarios creada en JS.
function TablaUsuarios(usertb) {

    const tbody = document.getElementById("t-body");

    usertb.forEach((user, i) => {

        //Tabla de Usuarios.
        const tableRow = document.createElement('tr');
        const tableHeader = document.createElement('th');
        tableHeader.scope = "row";
        tableHeader.innerHTML = i + 1;
        const tableDataId = document.createElement('td');
        tableDataId.innerHTML = user._id
        const tableDataNombre = document.createElement('td');
        tableDataNombre.innerHTML = user.Nombre
        const tableDataEmail = document.createElement('td');
        tableDataEmail.innerHTML = user.Email
        const tableDataOptions = document.createElement('td');
        //Lista Ordenada de usuarios.
        const listUl = document.createElement('ul');
        // listUl.className = "list-inline-item"

        //Boton para editar usuario.
        const listUserButton = document.createElement('li');
        listUserButton.className = 'list-inline-item';
        const EditButton = document.createElement('button');
        EditButton.className = 'btn btn-outline-success';
        EditButton.innerHTML = '<i class="fas fa-user-edit"></i>';
        EditButton.setAttribute("data-bs-target","#Editmodal");
        EditButton.setAttribute("data-bs-toggle","modal");

        // Boton para eliminar el usuario.
        const listDeleteButton = document.createElement('li');
        listDeleteButton.className = 'list-inline-item';
        const DeleteButton = document.createElement('button');
        DeleteButton.className = 'btn btn-outline-success';
        DeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        DeleteButton.setAttribute("data-bs-target", "#deleteModal");
        DeleteButton.setAttribute("data-bs-toggle", "modal");

        //Insertando los botones a opciones.
        tableDataOptions.insertAdjacentElement('beforeend', listUl);
        listUl.insertAdjacentElement('beforeend', listUserButton);
        listUl.insertAdjacentElement('beforeend', listDeleteButton);
        listUserButton.insertAdjacentElement('beforeend', EditButton);
        listDeleteButton.insertAdjacentElement('beforeend', DeleteButton);


        //Insertando los elementos creados a la tabla de usuarios. 
        tbody.insertAdjacentElement('beforeend', tableRow);
        tableRow.insertAdjacentElement('beforeend', tableHeader);
        tableRow.insertAdjacentElement('beforeend', tableDataId);
        tableRow.insertAdjacentElement('beforeend', tableDataNombre);
        tableRow.insertAdjacentElement('beforeend', tableDataEmail);
        tableRow.insertAdjacentElement('beforeend', tableDataOptions);


    })

}
