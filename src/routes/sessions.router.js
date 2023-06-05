import { Router } from 'express';
import userModel from '../Dao/models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {
   const { first_name, last_name, email, age, password } = req.body;
   const exist = await userModel.findOne({ email });

   if (exist) {
      return res.status(400).send({ status: "error", error: "El ususario ya existe" })
   }

   const user = {
      first_name,
      last_name,
      email,
      age,
      password
   }

   const result = await userModel.create(user);
   res.send({ status: "success", msg: "Usuario registrado" })

})

router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   const user = await userModel.findOne({ email, password });
   
   if (!user) {
      return res.status(400).send({ status: "error", error: "Datos incorretos" })
   }
   
   req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age
   }
   
   console.log(req.session.user);
   res.send({ status: "success", payload: req.res.user, msg: "Usuario logueado con exito" });
})

router.get('/logout', (req,res)=>{
   req.session.destroy(err =>{
       if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
       res.redirect('/');
   })
})

export default router;