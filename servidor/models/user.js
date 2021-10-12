import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    nombre:{type:String,required:[true,'El nombre de usuario es necesario']},
    email:{
        type:String,
        required:[true,'El email es necesario'],
        unique:true
    },
    password:{type:String,required:[true,'La contraseña es necesaria']},
    date:{type:Date,default:Date.now},
    actuvo:{type:Boolean,default:true}

});
userSchema.plugin(uniqueValidator, { message: 'Error, esperaba {PATH} único.' });

const user=mongoose.model('Usuarios',userSchema);
export default user;