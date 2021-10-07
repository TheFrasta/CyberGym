const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
module.exports = (app) => {

    app.get('/login', (req, res) => {

        res.render('login', { layout: './layouts/onlyfooter' })

    //     const {Email, Contrasena} = req.body;
    //     const user = new User({ Email, Contrasena })


    //     const salt = await bcrypt.genSaltSync(10);
    //     user.Contrasena = await bcrypt.hash(user.Contrasena, salt);

    });

    // app.post('/login', (req,res) =>{

    // const User = users.find({Contrasena:Contrasena})
    // if(User === null){
    //     res.status(400).send('El usuario no existe');
    // }
    // try{
    //     bcrypt.compare(User.Contrasena, )
    // }catch{

    // }

    // })



    // app.post('/login', (req, res) => {

    //     const { Email, Contrasena } = req.body;
    //     console.log(req.body);
    //     const user = new User({ Email , Contrasena })

    // });

}
