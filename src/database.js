const mongoose = require('mongoose');

mongoose.connect("mongodb://koizumi:aiShinozaki23@changotareas.com:27017/?changotareas=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database connected')).catch(err => console.log(err));