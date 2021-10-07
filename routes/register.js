const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports = (app) => {

    app.get('/register', (req, res) => {

        res.render('register', { layout: './layouts/onlyfooter' })

    });

    app.post('/register', async (req, res) => {

        const { Nombre, Email, Contrasena } = req.body;
        const user = new User({ Nombre, Email, Contrasena })

        const salt = await bcrypt.genSaltSync(10);
        user.Contrasena = await bcrypt.hash(user.Contrasena, salt);

        user.save(err => {

            if (err) {

                res.status(500).json({ msj: 'Error al registrar el usuario' });

            } else {

                res.status(200).json({ msj: 'Usuario registrado correctamente' });
            }


        });

    });

}

