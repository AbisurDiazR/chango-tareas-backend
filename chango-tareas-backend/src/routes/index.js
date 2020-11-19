const { Router } = require('express');
const router = Router();

//importamos el usuario
const User = require('../models/user');

const Tarea = require('../models/tareas');

const Mensaje = require('../models/mensaje');

//importamos el jsonwebtoken
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req,res)=>{
    res.send('Hello World');
    console.log(req.body)
});

//ruta para registrar un usuario
router.post('/signup', async (req, res) => {
    const {correo, nombre, password, nivel, rol, materias} = req.body;
    const newUser = new User({correo,nombre,password,nivel,rol, materias});
    await newUser.save();

    //metodo sing de jsonwebtoken que creara el token
    const token = jwt.sign({_id: newUser._id},'secretKey');
    console.log(newUser);

    //la respuesta ahora sera un token
    res.status(200).json({token});
});

//ruta para volver a iniciar sesion de usuario
router.post('/signin', async (req,res)=>{
    const { correo, password } = req.body;
    //find one devuelve un solo objeto y nos permite hacer la comparacion
    const user = await User.findOne({correo});
    //verificamos si el usuario existe en la base de datos
    if(!user) return res.status(401).send('El correo no existe');
    //validamos la contraseña
    if(user.password !== password) return res.status(401).send('Contraseña erronea');

    //obtenemos el token
    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token,user});
});

//ruta para nuevo mensaje
router.post('/newMessage',async(req,res) => {
    const {chatName, contenido, emisor, receptor} = req.body;

    const mensaje = new Mensaje({chatName, contenido, emisor, receptor});
    await mensaje.save();
    console.log(mensaje);
    return res.send('Mensaje enviado');
});

//ruta para obtener mensajes
router.get('/mensajes',verifyToken,(req,res) => {
    console.log(req.userId);
    Mensaje.find({"receptor": ObjectId(req.userId)}).lean().exec((err,doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({data: doc});
        }else{
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved'});
        }
    });
});

router.get('/private', verifyToken, (req, res)=>{
    Tarea.find().lean().exec((err,doc) => {
        if (doc.length>0) {
            console.log(doc);
            res.send({ data: doc });
        }else{
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved'});
        }
    });
});


//ruta para obtener el usuario actual
router.get('/home',verifyToken,(req,res)=>{    
    User.find({"_id" : ObjectId(req.userId)}).lean().exec((err,doc) => {
        if (doc.length > 0) {
            //console.log(doc);
            res.send({data: doc});
        }else{
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved'});
        }
    });
});

//ruta para obtener los usuarios que coincidan con los parametros
router.post('/users',verifyToken,(req,res) => {
    const {nivel,rol} = req.body;
    User.find({ nivel: nivel, rol: rol}).lean().exec((err,doc) => {
        if(doc.length > 0){
            //console.log(doc);
            res.send({data: doc})
        }else{
            console.log(err);
            res.send({ success: false, message: 'No documents retrieved' })
        }
    });
});

module.exports = router;

//para verificar la existencia del token en las rutas privadas
function verifyToken(req, res, next){
    //revisamos si existe la cabecera authorization
    if (!req.headers.authorization) {
        return res.status(401).send('Unthorize Request');
    }    

    //separamos el token que nos va a mandar el header
    const token = req.headers.authorization.split(' ')[1];

    //si el token obtenido esta vacio
    if(token === null){
        return res.status(401).send('Unathorize Request');
    }

    //verificamos el token obtenido
    const payload = jwt.verify(token,'secretKey');
    
    //asinamos el id que obtuvimos del token
    req.userId = payload._id;
    next(); 
}