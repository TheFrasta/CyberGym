const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (app) => {

    app.get('/register', (req, res) => {

        res.render('register', { layout: './layouts/onlyfooter' })


    });

    app.post('/register', async (req, res) => {

        const { Nombre, Email, Contrasena, role } = req.body;
        const user = new User({ Nombre, Email, Contrasena, role });
        const email = await User.findOne({ Email });
        const salt = await bcrypt.genSalt(10);
        user.Contrasena = await bcrypt.hash(user.Contrasena, salt);

        console.log(role);

        if (email) {

            return res.status(401).json({ msj: 'El email ya esta en uso' });

        }

        if (role == null) {

            console.log(role, "Register.js");
            res.status(200).json({ msj: 'El usuario fue registrado' });
            const user = new User({ Nombre, Email, Contrasena, role: "user" })
            user.save();

        } else {

            res.status(200).json({ msj: 'Usuario ' })
            const user = new User

                ({
                    Nombre,
                    Email,
                    Contrasena,
                    role
                });

            user.save();

        }

    });

}


        // user.save(err => {

        //     if (err) {

        //         res.status(500).json({ msj: 'Error al registrar el usuario' });

        //     } else {

        //         res.status(200).json({ msj: 'Usuario registrado correctamente' });
        //     }


        // });


