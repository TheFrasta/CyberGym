const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = (app) => {

    app.get('/usuarios', async (req, res) => {

        res.render('usuarios');

    });

    app.get('/get-user', verifyToken, async (req, res) => {

        const user = await User.find()

        res.status(200).json({

            users: user

        })

    })

    //Authenticate
    function verifyToken(req, res, next) {
        const token = req.header['authenticate']
        console.log(token, 'Soy USUARIOS')

        if (!token) return res.status(401).json({ error: 'Acceso denegado' })
        try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
                req.user = verified
                next()  
            }) 
           // continuamos
        } catch (error) {
            res.status(400).json({ error: 'token no es válido' })
        }
    }

}


    // if (token == null) return res.sendStatus(401)

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //         if(err) return res.sendStatus(403);
    //         req.user = user
    //         next()
    //         })


    // function authenticateToken(req, res, next) {
    //         const authHeader = req.headers['authorization'];
    //         const token = authHeader && authHeader.split('')[1]
    // }