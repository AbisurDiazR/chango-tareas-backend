const mongoose = require('mongoose');

mongoose.connect("mongodb://changotareas.com:27017/changotareas", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database connected')).catch(err => console.log(err));