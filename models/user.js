const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({

    Nombre:     String,
    Email:      String,
    Contrasena: {type: String, select: false},
    role:       String,
    permisos:   Array, 

})

// Modelo Export

const User = mongoose.model('users', UserSchema);
module.exports = User;