const { Router } = require('express');
const router = Router();

//importamos el usuario
const User = require('../models/user');

const Tarea = require('../models/tareas');

const Mensaje = require('../models/mensaje');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

//importamos el jsonwebtoken
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

//variable fetch
var fetch = require('node-fetch');

//Agregamos credenciales
mercadopago.configure({
    access_token: 'TEST-7278820777929276-112400-87a9751d1572934a08f4134b692ae467-151662073'
});

router.get('/', (req, res) => {
    res.send('Hello World');
    console.log(req.body)
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
    const {correo} = req.body;

    const user = await User.findOne({correo});

    if(user){
        res.send({data: 'unavalaible'})
    }else{
        res.send({data: 'avalaible'});
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
    if (!user) return res.status(401).json({mensaje: 'El correo no existe'});
    //validamos la contraseña
    if (user.password !== password) return res.status(401).json({mensaje: 'Contraseña erronea'});

    //obtenemos el token
    const token = jwt.sign({ _id: user._id }, 'secretKey');
    return res.status(200).json({ token, user });
});

//ruta para nuevo mensaje
router.post('/newMessage', async (req, res) => {
    const { chatName, contenido, emisor, receptor } = req.body;

    const mensaje = new Mensaje({ chatName, contenido, emisor, receptor });
    await mensaje.save();
    console.log(mensaje);
    return res.send('Mensaje enviado');
});

//ruta para obtener mensajes
router.get('/mensajes', verifyToken, (req, res) => {
    console.log(req.userId);
    Mensaje.find({ "receptor": ObjectId(req.userId) }).lean().exec((err, doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({ data: doc });
        } else {
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved' });
        }
    });
});

router.get('/private', verifyToken, (req, res) => {
    Tarea.find().lean().exec((err, doc) => {
        if (doc.length > 0) {
            console.log(doc);
            res.send({ data: doc });
        } else {
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved' });
        }
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