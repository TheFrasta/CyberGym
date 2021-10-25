const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {verifyToken, verifyRole} = require('../Frontend/js/Auth');

module.exports = (app) => {

    app.get('/usuarios', async (req, res) => {

        res.render('usuarios');

    });

    app.get('/get-user', verifyToken, verifyRole('superadmin'), async (req, res) => {
        console.log('holaaa');
        const user = await User.find()
        res.status(200).json({ users: user })

    });

    app.post('/post-edituser', async (req, res) => {

        const { _id, Nombre, Email } = req.body;
        const user = await User.findOne({ _id });
        // console.log('Hola Estoy en Usuarios',user);

        if (Nombre == "") {
            return res.status(406).json({ msj: 'El Nombre no puede estar vacio' })
        }

        if (Email == "") {
            return res.status(406).json({ msj: 'El email no puede estar vacio' })

        }

        console.log(Email);
        console.log(user.Email);

        if (Email != user.Email) {

            console.log(Email);
            const email = await User.findOne({ Email: Email });
            console.log(email);

            if (email) {

                return res.status(401).json({ msj: 'El email esta en uso' })

            }

        }

        await User.findByIdAndUpdate(_id, { Nombre, Email });
        return res.status(200).json({ msj: 'Usuario ha sido modificado correctamente' })

    });

    app.delete('/delete-editdelete', async (req, res) => {

        const { _id } = req.body;
        const user = await User.deleteOne({ _id });
        console.log(user);

        if (user) {
            res.status(200).json({ msj: "a casaaaa" })
        } else {
            res.status(500).json({ msj: "Error no identificado" })
        }

    })


}

