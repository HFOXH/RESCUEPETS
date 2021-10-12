const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


const app = express();

//Conexion BD
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/bdmascotas'
//const url = 'mongodb+srv://usuario:12345@rescuepets.utudn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = {useNewUrlParser: true,  useUnifiedTopology: true};

mongoose.connect(url,options).then(
    ()=>{console.log('Conexion exitosa a mongo')},
    err=>{err}
);

//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



//Rutas
//app.get('/',function(req,res){
//    res.send("hola mundo")
//});

//middleware para vue.js
app.use('/api',require('./routes/bdmascota'))
app.use('/api',require('./routes/user'))
app.use('/login', require('./routes/login'));
const history= require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname,'public')));


app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () { 
    console.log('Escuchando el puerto '+ app.get('puerto')); 
});

