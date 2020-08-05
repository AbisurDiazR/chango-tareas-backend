//guardamos la constante cors
const cors = require('cors');
const express = require('express');
const app = express();
//constante del puerto
const PORT = process.env.PORT||3000;

require('./database');

//añadimos las cabeceras cors
app.use(cors());
//el metodo json es para obtener el body del request en formato json
app.use(express.json());

//importamos la ruta
app.use('/api',require('./routes/index'));

app.listen(PORT);
console.log('Server on port', PORT);