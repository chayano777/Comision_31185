import { Router } from "express";
import ViewController from '../controllers/view.controller.js'

const router = Router();
const viewController = new ViewController();

const publicAccess = (req, res, next) => {
  //console.log('public');
  if (req.session.user) return res.redirect('/products');
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
};

router.get('/', publicAccess, viewController.getLogin);

router.get('/register', publicAccess, viewController.getRegister);

router.get('/resetPassword', publicAccess, viewController.getResetPass);

router.get('/profile', privateAccess, viewController.getProfile);

// router.get('/', async (req, res)=>{                      
//     const products = await manager.getProducts('', 3 , 1, -1)
//     res.render('products', products );
// })

router.get('/realTimeProducts', privateAccess, viewController.getRealTimeProducts)

router.get('/chat', privateAccess, viewController.getChat)

router.get('/products', privateAccess, viewController.getViewProducts)

router.get('/carts/:cid',privateAccess, viewController.getViewCart);

export default router;
