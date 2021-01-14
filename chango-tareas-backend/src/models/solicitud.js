//requerimos schema y model de mongodb
const {Schema, model} = require('mongoose');

const solicitudSchema = new Schema({
    nombreSolicitante: String,
    correoSolicitante: String,
    cvSolicitante: String,
    estatusSolicitud: String
},{
    timestamps: true
});

module.exports = model('Solicitudes',solicitudSchema);