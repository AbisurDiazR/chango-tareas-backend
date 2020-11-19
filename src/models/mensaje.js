const { Schema, model} = require('mongoose');

const mensajeSchema = new Schema({
    chatName: String,
    contenido: String,
    emisor: {type: Schema.Types.ObjectId, ref: 'User'},
    receptor: {type: Schema.Types.ObjectId, ref: 'User'},
},{
    timestamps: true
});

module.exports = model('Mensaje',mensajeSchema);