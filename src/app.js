import express from 'express';
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/productManager.js';

const PORT = '8080';
const app = express();
const server = app.listen(PORT, ()=>{
    console.log(`Servidor UP! en Puerto: ${PORT}`);
});

const manager = new ProductManager();
const socketServer = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


socketServer.on('connection', async socket=>{
    console.log("Conectado")
    const products = await manager.getProducts();

    /*socket.on('mensaje', data => {
        console.log('Esto viene desde el cliente: ' + data);
    })*/
    
    socketServer.emit('log', products);

    socket.on('add_product', async data =>{
        await manager.addProduct(data);
    })

    socket.on('del_product', async data =>{
        await manager.deleteProduct(data);
    })

})



