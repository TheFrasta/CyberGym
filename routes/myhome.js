const express = require('express')
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (app) => {

    app.get('/myhome', async (req, res) => {
            res.render('myhome')
    })

    }