//rquerimos schema y model de mongoose
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    correo: String,
    password: String,
    nivel: String,
    rol: String,
    materias: String,
    credenciales: {
        access_token: String,
        expires_in: Number,
        live_mode: Boolean,
        public_key: String,
        refresh_token: String,
        scope: String,
        token_type: String,
        user_id: Number
    }
}, {
    timestamps:true //automaticamene agrega el campo created at y updated at
});

module.exports = model('User',userSchema);