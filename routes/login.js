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

        const userpass = await User.findOne({ Email }).select('+Contrasena');
        // select("-Contrasena")/
        console.log(userfind);

        if (!userfind) {
            return res.status(401).json({ msj: 'email or password invalid' })
        }
        const isMatch = await bcrypt.compare(Contrasena, userpass.Contrasena);
        if (!isMatch) {
            res.status(401).json({ msj: 'email or password invalid' })
        }
        if (isMatch && user) {
            console.log('HOLA GENTE',userfind);
            const accessToken = jwt.sign({Nombre: userfind.Nombre, Email: userfind.Email, role: userfind.role}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "60m"
            });

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

