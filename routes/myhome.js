const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = (app) => {

        app.get('/myhome', async (req, res) => {
                const user = await User.find()
                res.render('myhome', { User: user })
        });

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

}