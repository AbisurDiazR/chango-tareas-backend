//requerimos schema y model de mongodb
const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    username: String,
    password: String
},{
    timestamps: true
});

module.exports = model('Admins',adminSchema);