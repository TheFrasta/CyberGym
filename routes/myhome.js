const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');



module.exports = (app) => {

        app.get('/myhome', async (req, res) => {
                const user = await User.find()
                res.render('myhome',{User: user})
        });

}