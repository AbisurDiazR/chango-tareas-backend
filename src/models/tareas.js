const { Schema, model } = require('mongoose');

const tareaSchema = new Schema({
    titulo: String,
    descripcion: String,
    presupuesto: Number,
    materia:String,
    autor: String,
    profesor: String,
}, {
    timestamps: true //fecha de update and create
});

module.exports = model('Tarea',tareaSchema);