import mongoose from "mongoose";

const cartCollection = 'carts';

const schema = new mongoose.Schema({

    products: {
        type: [ 
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    require: true
                }
            }
        ],
        default: []
    },
    
});

const cartModel = mongoose.model(cartCollection, schema);

export default cartModel