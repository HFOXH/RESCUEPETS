
import express from 'express';
const router = express.Router();

const jwt = require('jsonwebtoken');

import User from '../models/user';

// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;

// router.get('/login/?email', async(req, res) => {
  
//   const body = req.body;

//   try {

//     // Evaluando el email
//     const usuarioDB = await User.findOne({email: body.email})
//     if(!usuarioDB){
//       return res.status(400).json({
//         mensaje: 'Email no encontrado'
//       })
//     }

//     // Evaluar la contraseña
//     if(!bcrypt.compareSync(body.password, usuarioDB.password)){
//       return res.status(400).json({
//         mensaje: 'Contraseña incorrecta'
//       })
//     }

//     // Generar token
//     const token = jwt.sign({
//       data: usuarioDB
//     }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });

//     res.json({
//       usuarioDB,
//       token
//     })
    
//   } catch (error) {
//     return res.status(400).json({
//       mensaje: 'Ocurrió un error',
//       error
//     })
//   }

// });
// router.get('/login/:email', async(req,res)=>{
//   try {
//       const usuarioDB = await User.find();
//       res.json(usuarioDB);
      
//   } catch (error) {
//       return res.status(400).json({
//           mensaje:'Error',
//           error
//       })
//   }
// });
router.get('/login/:email', async(req, res) => {
  const email = req.params.email;
  const body = _.pick(req.body, ['nombre', 'email', 'password', 'activo']);

  if(body.password){
    body.password = bcrypt.hashSync(req.body.pass, saltRounds);
  }

  try {

    const usuarioDB = await User.findByIdAndUpdate(email, body, {new: true, runValidators: true})

    return res.json(usuarioDB);
    
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }

})
module.exports = router;