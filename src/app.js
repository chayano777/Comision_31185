import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import passport from 'passport';

import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import ProductManagerDao from './Dao/productManagerDao.js';
import MessageManagerDao from './Dao/chatManagerDao.js';
import initializePassport from './config/passport.config.js';

const PORT = 8080;
const app = express();
const server = app.listen(PORT, ()=>{
    console.log(`Servidor UP! en Puerto: ${PORT}`);
});

const MONGO = 'mongodb+srv://marianoeiro:mariano.database.2023@cluster0.ubyswjq.mongodb.net/ecommerce';
mongoose.connect(MONGO)


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

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:'WordSecret',
    resave:false,
    saveUninitialized:false
}))

// Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);

// Chat con Socket
io.on('connection', async socket=>{
    console.log("Conectado")
    
    const products = await managerProduct.getProducts('', 3, 1, -1);
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
        const op_del = await managerProduct.deleteProduct(data);
        if(!op_del){
            io.emit('alerta', {status: 'noexiste'})
        } else {
            const products = await managerProduct.getProducts();
            io.emit('log', products);
            io.emit('alerta', {status: 'deleteok'})
        }
    })

    socket.on('chat', async data => {
        await managerMessage.createMessage(data);
        msgChat.push(data);
        io.emit('chat', msgChat);
    })

})
