const mongoose = require('mongoose');

mongoose.connect("mongodb://changotareas.ml:27017/",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db=>console.log('Database connected')).catch(err=>console.log(err));
