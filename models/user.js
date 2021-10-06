const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

Nombre:         String,
Email:          String,
Contrasena:     String

}) 

// Modelo Export

const User = mongoose.model('users', UserSchema);
module.exports = User;