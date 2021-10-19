const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

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

    app.post('/post-edituser', async (req, res) => {

        const { _id, Nombre, Email } = req.body;
        console.log(Nombre);
        const user = await User.findByIdAndUpdate(_id, { Nombre, Email });
        res.status(200).json({ userdata: user });

        if (!user) {

            res.status(400).json({ msj: 'Error Encontrado' });
        }

        // const userdata = { _id };
        // console.log(userdata);
    })

    //Authenticate
    function verifyToken(req, res, next) {
        const token = req.headers['authenticate']

        if (true) {

            if (!token) return res.status(401).json({ error: 'Acceso denegado' })
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = verified
            // console.log(verified)
            next()
            // continuamos
        } else {
            res.status(400).json({ error: 'token no es válido' })
        }
    }
}