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
        const user = await User.findOne({ Email })

        if(!user){
            res.status(401).json({ msj : 'email or password invalid' })
        }
        const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);
        if(!isMatch){
            res.status(401).json({ msj : 'email or password invalid' })
        }
        
        //         if (User === null) {
        //             res.status(400).send('El usuario no existe');
        //         }
        //         try {
        //             bcrypt.compare()
        //         } catch {
        //             res.status(500).send('Ha ocurrido un error');
        //         }

    })
}
