//guardamos la constante cors
const cors = require('cors');
const express = require('express');
const app = express();
//constante del puerto
const PORT = process.env.PORT || 3000;

require('./database');

//añadimos las cabeceras cors
app.use(cors());
//el metodo json es para obtener el body del request en formato json
app.use(express.json());

// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://changotareas.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//importamos la ruta
app.use('/api', require('./routes/index'));

app.listen(PORT);
console.log('Server on port', PORT);