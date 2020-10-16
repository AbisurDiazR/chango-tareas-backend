//rquerimos schema y model de mongoose
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    correo: String,
    password: String,
    rol: String,
}, {
    timestamps:true //automaticamene agrega el campo created at y updated at
});

module.exports = model('User',userSchema);