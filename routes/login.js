require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = (app) => {

    app.get('/login', (req, res) => {

        res.render('login', { layout: './layouts/onlyfooter' })

    });

    //Probando

    app.post('/login', async (req, res) => {

        const { Email, Contrasena } = req.body;
        const user = { Email, Contrasena };
        const userfind = await User.findOne({ Email });

        if (!userfind) {
            return res.status(401).json({ msj: 'email or password invalid' })
        }
        const isMatch = await bcrypt.compare(Contrasena, userfind.Contrasena);
        if (!isMatch) {
            res.status(401).json({ msj: 'email or password invalid' })
        }
        if (isMatch && user) {

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "30m"
            });

            console.log(accessToken, 'SOY LOGIN');

            res.status(200).json({ accessToken: accessToken, msj: 'Ha iniciado sesion correctamente' });

        }


    })


    // app.post('/login', async (req, res) => {


    //     const { Email, Contrasena } = req.body;
    //     const user = await User.findOne({ Email })
    //     const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);

    //     if (!user) {
    //         res.status(401).json({ msj: 'email or password invalid' })
    //     }
    //     if (!isMatch) {
    //         res.status(401).json({ msj: 'email or password invalid' })
    //     }
    //     if (isMatch && user) {
    //         res.status(200).json({ msj: 'Ha iniciado sesion' })
    //     }

    // })

}

