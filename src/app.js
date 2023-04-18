import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';

const PORT = '8080';


const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'views')
app.set('view engine','handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'./public'))

app.listen(PORT, ()=>{
    console.log(`Servidor UP! en Puerto: ${PORT}`);
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)



