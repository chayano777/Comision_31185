import mongoose from "mongoose";

const messageCollection = 'messages';

const schema = new mongoose.Schema({

    user: {
        type: String,
        require: true
    },

    message: {
        type: String,
        require: true
    }
});

const messageModel = mongoose.model(messageCollection, schema);

export default messageModel