import mongoose from "mongoose";

const cartCollection = 'carts';

const schema = new mongoose.Schema({

    cid: {
        type: Number,
        require: true
    },

    products: [{
        
        pid: {
            type: Number,
            require: true    
        },

        quantity: {
            type: Number,
            require: true
        }
    }]
});

const cartModel = mongoose.model(cartCollection, schema);

export default cartModel