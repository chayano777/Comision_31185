import { Router } from "express";
import ProductManagerDao from "../Dao/productManagerDao.js";
import CartManagerDao from "../Dao/cartManagerDao.js";

const router = Router();
const manager = new ProductManagerDao();
const managerDao = new CartManagerDao();

const publicAccess = (req, res, next) => {
  //console.log('public');
  if (req.session.user) return res.redirect('/products');
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/');
  next();
};

router.get('/', publicAccess, async (req, res) => {
  res.render('login');
});

router.get('/register', publicAccess, async (req, res) => {
  res.render('register');
});

router.get('/resetPassword', publicAccess, async (req, res) => {
  res.render('resetPassword');
});

router.get('/profile', privateAccess, async (req, res) => {
  res.render('profile', {
    user: req.session.user
  });
});

// router.get('/', async (req, res)=>{                      
//     const products = await manager.getProducts('', 3 , 1, -1)
//     res.render('products', products );
// })

router.get('/realTimeProducts', privateAccess, (req, res) => {

  res.render('realTimeProducts', {})
})

router.get('/chat', privateAccess, (req, res) => {
  res.render('chat', {});
})

router.get('/products', privateAccess, async (req, res) => {

  const page = req.query.page || 1;

  const { products, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await manager.getProducts('', 3, page, 'desc')

  res.render('products',
    {
      products,
      prevPage,
      nextPage,
      totalPages,
      hasPrevPage,
      hasNextPage,
      user: req.session.user
    });
})

router.get('/carts/:cid',privateAccess, async (req, res) => {
  const result = await managerDao.getCartProdById(req.params.cid);
  const products = result.products;
  res.render('cartId', { products });
});

export default router;
