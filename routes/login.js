const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
module.exports = (app) => {

    app.get('/login', (req, res) => {

        res.render('login', { layout: './layouts/onlyfooter' })

    });

    app.post('/login', (req, res) => {

        const { Email, Contrasena } = req.body;
        console.log(req.body);
        const user = new User({ Email , Contrasena })

    });
    
}
