import mongoose from "mongoose";
const Schema=mongoose.Schema;


const mascotaShema=new Schema({
    tipo:String,
    nombre:{type: String, required:[true,'Nombre de mascota obligatorio']},
    raza: String,
    tamaño: String,
    edad: String,
    date:{type: Date, default: Date.now},
    activo:{type: Boolean, default:true}
});

//convertir a modelo
const bdmascota=mongoose.model('mascotas',mascotaShema);
export default bdmascota;