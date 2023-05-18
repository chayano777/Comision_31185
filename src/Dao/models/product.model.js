import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = 'products';

const schema = new mongoose.Schema({
  
    title: {
        type: String,
        require: true,
        index: true
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

schema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, schema);

export default productModel