const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
module.exports = (app) => {

    app.get('/register', (req, res) => {

        res.render('register', { layout: './layouts/onlyfooter' })

    });

    app.post('/register', (req, res) => {

        const { Nombre, Email, Contrasena } = req.body;
        console.log(req.body);
        const user = new User({Nombre, Email, Contrasena})

        user.save(err => {

            if (err) {
        
                res.status(500).json({ msj: 'Error al registrar el usuario' });
        
            } else {
        
                res.status(200).json({ msj: 'Usuario registrado correctamente' });
            }
        
        
        });

    });
    
}

