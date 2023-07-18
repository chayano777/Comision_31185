import userModel from '../Dao/models/user.model.js'
import { createHash } from '../utils.js'

class SessionController {

register = async (req, res) => {
    res.send({ status: "succes", msg: "Usuario registrado" });
 }

failRegister = async (req,res) => {
    console.log('Fallo en el registro');
    res.send({ status: "ERROR", msg: "Error en el registro" });
 }

login = async (req, res) => {
   
    if(!req.user) return res.status(401).send({status: "ERROR", msg:"Credenciales invalidas"});
 
    req.session.user ={
       first_name: req.user.first_name,
       last_name: req.user.last_name,
       email: req.user.email,
       age: req.user.age,
       cartId: req.user.cartId,
       rol: req.user.rol
    }
    
    res.send({ status: "success", payload: req.user, message: "Usuario logueado" })
 } 

logout = (req, res) => {
    req.session.destroy(err => {
       if (err) return res.status(500).send({ status: "error", error: "No pudo cerrar sesion" })
       res.redirect('/');
    })
 }

resetPassword = async (req, res) => {
    const { email, password } = req.body;
 
    if (!email || !password) return res.status(400).send({ status: "error", msg: "Datos incorrectos" });
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ status: "error", msg: "Datos incorrectos" });
 
    const newHashedPassword = createHash(password);
    await userModel.updateOne({ _id: user.id }, { $set: { password: newHashedPassword } });
 
    res.send({ status: "success", msg: "Contraseña actualizada" });
 }

loginGit = async (req,res)=>{}

githubCallBack = async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/products')
}

}

export default SessionController;