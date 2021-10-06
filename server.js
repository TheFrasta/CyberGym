// Declarando modulos.
const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-Layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connect to DB.
mongoose.connect('mongodb://localhost/CyberGymDB')
.then(() => console.log('base de datos conectada'))
.catch(e => console.log(e))

//BodyParser (Envio de base datos).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//View Engine and ejs Module.
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Frontend/views')) // redireccionar la carpeta donde me buscara el views.

//Layouts

app.use(expressLayouts);
app.set('layout', './layouts/fullstructure')

//Importando el FrontEnd
app.use(express.static('Frontend'));


//Routes
require('./routes')(app)

//Servidor On.
app.listen(2000, () => {

    console.log('El servidor esta funcionando');

})