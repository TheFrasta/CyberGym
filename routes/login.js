const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports = (app) => {

    app.get('/login', (req, res) => {

        res.render('login', { layout: './layouts/onlyfooter' })

    });

    app.post('/login', async (req, res) => {

        const {Email, Contrasena } = req.body;
        console.log(req.body);
        const user = await User.findOne({ Email })
        const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);

        if(!user){
            res.status(401).json({ msj : 'email or password invalid' })
        }
        if(!isMatch){
            res.status(401).json({ msj : 'email or password invalid' })
        }
        if(isMatch && user){
            res.status(200).json({ msj : 'Ha iniciado sesion' })
        }
        
    })
}
