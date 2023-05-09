import mongoose from "mongoose";

const productCollection = 'products';

const schema = new mongoose.Schema({
    pid: {
        type: Number,
        require: true,
        unique: true
    },

    title: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: true
    },

    code: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    stock: {
        type: Number,
        require: true
    },

    category: {
        type: String,
        require: true
    },

    thumbnail: {
        type: String,
        require: false
    },

    status: {
        type: Boolean,
        require: false
    }
});

const productModel = mongoose.model(productCollection, schema);

export default productModel