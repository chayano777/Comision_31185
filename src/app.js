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

const MONGO = 'mongodb+srv://marianoeiro:mariano.database.2023@cluster0.ubyswjq.mongodb.net/ecommerce';
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
        if(products.length === 0){
           return io.emit('alerta', {status: 'sindatos'})
        }
        io.emit('log', products);
        io.emit('alerta', {status: 'exito'})
    })
    
    socket.on('del_product', async data =>{
        const op_del = await managerProduct.deleteProduct(data.pid);
        if(op_del.deletedCount === 0){
            io.emit('alerta', {status: 'noexiste'})
        } else {
            const products = await managerProduct.getProducts();
            io.emit('log', products);
        }
    })

    socket.on('chat', async data => {
        console.log(data)
        await managerMessage.createMessage(data);
        msgChat.push(data);
        console.log(msgChat)
        io.emit('chat', msgChat);
    })

})



