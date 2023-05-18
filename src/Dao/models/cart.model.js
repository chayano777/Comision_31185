import mongoose from "mongoose";

const cartCollection = 'carts';

const schema = new mongoose.Schema({

    products: [{
        
        
        
        quantity: {
            type: Number,
            require: true
        }
    }]
});

const cartModel = mongoose.model(cartCollection, schema);

export default cartModel