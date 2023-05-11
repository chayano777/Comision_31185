import express from 'express';
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManagerDao from './Dao/productManagerDao.js';
import MessageManagerDao from './Dao/chatManagerDao.js';
//import ProductManager from './managers/productManager.js';

const PORT = 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log(`Servidor UP! en Puerto: ${PORT}`);
});

const MONGO = 'mongodb+srv://marianoeiro:mariano.database.2023@ecommerce.ubyswjq.mongodb.net/?retryWrites=true&w=majority';
const connection = mongoose.connect(MONGO)


const msgChat = [];

const managerProduct = new ProductManagerDao();
const managerMessage = new MessageManagerDao();
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


io.on('connection', async socket=>{
    console.log("Conectado")
    
    const products = await managerProduct.getProducts();
    socket.emit('log', products);

    /*socket.on('mensaje', data => {
        console.log('Esto viene desde el cliente: ' + data);
    })*/
    
    socket.on('add_product', async data =>{
        await managerProduct.addProduct(data);
        const products = await managerProduct.getProducts();
        io.emit('log', products);
        io.emit('alerta', {status: 'exito'})
    })
    
    socket.on('del_product', async data =>{
        const op_del = await managerProduct.deleteProduct(data.pid);
        if(op_del.existe === false){
            io.emit('alerta', 'noexiste')
        } else {
            const products = await managerProduct.getProducts();
            io.emit('log', products);
        }
    })

    socket.on('chat', async data => {
        const result = await managerMessage.createMessage(data);
        msgChat.push(result);
        io.emit('chat', msgChat);
    })

})



