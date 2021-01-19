const { Router } = require('express');
const router = Router();

//importamos el usuario
const User = require('../models/user');

const Tarea = require('../models/tareas');

const Mensaje = require('../models/mensaje');

const Solicitud = require('../models/solicitud');

const Admin = require('../models/admin');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

//importamos el jsonwebtoken
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

//variable fetch
var fetch = require('node-fetch');

//importamos el nodemailer
const nodemailer = require('nodemailer');

//politicas cors
const cors = require('cors');

//Agregamos credenciales
mercadopago.configure({
    access_token: 'TEST-7278820777929276-112400-87a9751d1572934a08f4134b692ae467-151662073'
});

router.get('/', (req, res) => {
    res.send('Hello World');
    console.log(req.body)
});

//implementación politicas cors
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//ruta para notificar al solicitante
router.post('/notificar', async (req, res) => {
    const { nombre, mensaje, url, destino } = req.body;

    contentHtml = `
        <h1>Sr. ${nombre} esta es la informacion sobre su postulación<h1>
        <p>${mensaje}</p>
        <a href="${url}">Click para ver</a>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'abisur_yue@hotmail.com',
            pass: 'aiShinozaki23'
        }
    });

    const info = await transporter.sendMail({
        from: "'ChangoTareas' <abisur_yue@hotmail.com>",
        to: `${destino}`,
        subject: `Solicitud de registro aceptada`,
        text: 'Ha sido aceptado',
        html: contentHtml
    });

    console.log('Message sent', info.messageId);

    res.status(200).send({ data: 'Success' });

});

//ruta para registrar solicitudes
router.post('/solicitud', async (req, res) => {
    const { nombreSolicitante, correoSolicitante, cvSolicitante, estatusSolicitud } = req.body;

    const newSolicitud = Solicitud({ nombreSolicitante, correoSolicitante, cvSolicitante, estatusSolicitud });
    await newSolicitud.save();

    console.log(newSolicitud);

    res.status(200).send({ data: 'Success' });
});

//ruta para enviar el correo con nodemailer
router.post('/send-email', cors(), async (req, res, next) => {

    const { nombre, email, mensaje, url, destino } = req.body;

    contentHtml = `
        <h1>CV solicitante ${nombre}<h1>
        <ul>
            <li>Contactar a: ${email}</li>
            <li>${mensaje}</li>
        </ul>
        <a href="${url}">Click para ver</a>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: 'abisur_yue@hotmail.com',
            pass: 'aiShinozaki23'
        }
    });

    try{
        const info = await transporter.sendMail({
            from: "'ChangoTareas' <abisur_yue@hotmail.com>",
            to: `${destino}`,
            subject: `Solicitud de registro ${nombre}`,
            text: 'Hola guapo :v',
            html: contentHtml
        });
    }catch(err){
        next(err);
    }
        
    console.log('Message sent', info.messageId);

    res.status(200).send({ data: 'Success' });
});

//ruta para mercado pago credenciales
router.post('/credenciales', (req, res) => {
    posData('https://api.mercadopago.com/oauth/token', req.body).then(data => {
        //console.log(data);
        res.send({ data: data });
    });
});

//petición curl a mercadopago usando fetch
async function posData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
}

//ruta para crear link de pago
router.post('/mercadopago', (req, res) => {
    //Creamos objeto de preferencia
    let preference = {
        "back_urls": {
            "success": req.body.back_urls.success,
            "failure": req.body.back_urls.failure,
            "pending": req.body.back_urls.pending
        },
        items: [req.body.items],
        marketplace_fee: req.body.fee
    };

    mercadopago.preferences.create(preference).then(function (response) {
        res.send({ data: response.body });
        console.log(response.body);
    }).catch(function (err) {
        console.log(err);
    });
});

//ruta para revisar existencia de usuario y correo
router.post('/validar', async (req, res) => {
    const { correo } = req.body;

    const user = await User.findOne({ correo });

    if (user) {
        res.send({ data: 'unavalaible' })
    } else {
        res.send({ data: 'avalaible' });
    }
});

//ruta para registrar un usuario
router.post('/signup', async (req, res) => {
    const { correo, nombre, password, nivel, rol, materias, credenciales } = req.body;

    //validamos si el correo ya esta registrado

    const newUser = new User({ correo, nombre, password, nivel, rol, materias, credenciales });
    await newUser.save();

    //metodo sing de jsonwebtoken que creara el token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey');
    console.log(newUser);

    //la respuesta ahora sera un token
    res.status(200).json({ token });
});

//ruta para volver a iniciar sesion de usuario
router.post('/signin', async (req, res) => {
    const { correo, password } = req.body;
    //find one devuelve un solo objeto y nos permite hacer la comparacion
    const user = await User.findOne({ correo });
    //verificamos si el usuario existe en la base de datos
    if (!user) return res.status(401).json({ mensaje: 'El correo no existe' });
    //validamos la contraseña
    if (user.password !== password) return res.status(401).json({ mensaje: 'Contraseña erronea' });

    //obtenemos el token
    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({ token, user });
});

//ruta para listar usuarios
router.get('/users', verifyToken, (req, res) => {
    User.find().lean().exec((err, doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({ data: doc });
        } else {
            //console.log(err);
            res.send({ success: false, message: 'No hay usuarios registrados' })
        }
    });
});

//ruta para eliminar usuario
router.post('/user', (req, res) => {
    const { id } = req.body;

    User.deleteOne({ "_id": ObjectId(id) }).lean().exec((err, doc) => {
        res.send({ success: true, message: 'Se ha eliminado al usuario' });
    });
});

//ruta para listar solicitudes
router.get('/solicitudes', verifyToken, (req, res) => {
    Solicitud.find().lean().exec((err, doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({ data: doc });
        } else {
            //console.log(err);
            res.send({ success: false, message: 'No hay solicitudes actualmente' });
        }
    });
});

//ruta para rechazar solicitud
router.post('/solicitudes', (req, res) => {
    const { estatus, id } = req.body;

    Solicitud.update({ "_id": id }, { "$set": { "estatusSolicitud": estatus } }).lean().exec((err, doc) => {
        res.send({ success: true, message: 'Actualizado', estatus: estatus });
    });
});

//ruta para obtener el usuario actual
router.get('/home', verifyToken, (req, res) => {
    User.find({ "_id": ObjectId(req.userId) }).lean().exec((err, doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({ data: doc });
        } else {
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved' });
        }
    });
});

//ruta para obtener los usuarios que coincidan con los parametros
router.post('/users', verifyToken, (req, res) => {
    const { nivel, rol } = req.body;
    User.find({ nivel: nivel, rol: rol }).lean().exec((err, doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({ data: doc })
        } else {
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved' })
        }
    });
});

module.exports = router;

//para verificar la existencia del token en las rutas privadas
function verifyToken(req, res, next) {
    //revisamos si existe la cabecera authorization
    if (!req.headers.authorization) {
        return res.status(401).send('Unthorize Request');
    }

    //separamos el token que nos va a mandar el header
    const token = req.headers.authorization.split(' ')[1];

    //si el token obtenido esta vacio
    if (token === null) {
        return res.status(401).send('Unathorize Request');
    }

    //verificamos el token obtenido
    const payload = jwt.verify(token, 'secretKey');

    //asinamos el id que obtuvimos del token
    req.userId = payload._id;
    next();
}