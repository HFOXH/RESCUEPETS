import express from 'express'
const router = express.Router();

import User from '../models/user';

const {verificarAuth} = require('../middlewares/autenticacion')
//Hash
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.put('/usuario/:id', [verificarAuth], async(req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'email', 'password', 'activo']);
  
    if(body.password){
      body.password = bcrypt.hashSync(req.body.pass, saltRounds);
    }
  
    try {
  
      const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true})
  
      return res.json(usuarioDB);
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrió un error',
        error
      })
    }
  
  })
  
//Post
router.post('/nuevo-usuario',async(req,res)=>{
    const body = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
        }
        body.password = bcrypt.hashSync(req.body.password, saltRounds);
       
    try {
        const usuarioDB = await User.create(body);
        res.json(usuarioDB);
    } catch (error) {
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        });
    }
})
router.get('/buscarUsuario', async(req,res)=>{
    try {
        const usuarioDB = await User.find();
        res.json(usuarioDB);
        
    } catch (error) {
        return res.status(400).json({
            mensaje:'Error',
            error
        })
    }
});
module.exports=router;