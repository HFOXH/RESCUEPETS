import express from 'express'
const router = express.Router();

//importar el modelo 

import bdmascota from '../models/bdmascota';

// Agregar una mascota

router.post('/nueva-mascota', async(req, res)=>{
    const body = req.body;
    try {

        const dbmascota= await bdmascota.create(body);
        res.status(200).json(dbmascota);
        
    } catch (error) {
        return res.status(500).json({
            mensaje:'Ocurrio un error inesperado',
            error
        })
    }
});
//Get buscar todos los registros
router.get('/buscarTodo', async(req,res)=>{
    try {
        const basemascota = await bdmascota.find();
        res.json(basemascota);
        
    } catch (error) {
        return res.status(400).json({
            mensaje:'Error',
            error
        })
    }
});
//Get con parametro
router.get('/buscarParametro/:id', async(req,res)=>{
    const _id=req.params.id;
    try {
        const bsmascota = await bdmascota.findOne({_id});
        res.json(bsmascota);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error',
            error
        })
    }
});
//Eliminar
router.delete('/eliminarParametro/:id', async(req,res)=>{
    const _id=req.params.id;
    try {
        const bs1mascota = await bdmascota.findByIdAndDelete({_id});
        if(!bs1mascota){
            return res.status(400).json({
                mensaje: 'No se encontró mascota',
                error
            })
        }
        res.json(bs1mascota);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al eliminar',
            error
        })
    }
})
//Actualizar
router.put('/actualizar/:id', async(req,res)=>{
    const _id=req.params.id;
    const body = req.body;
    try {
        const bamascota = await bdmascota.findByIdAndUpdate(
            _id, 
            body,{new: true});
            res.json(bamascota);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'No se logro actualizar',
            error
        })
    }
})
//Exportacion de router
module.exports=router;