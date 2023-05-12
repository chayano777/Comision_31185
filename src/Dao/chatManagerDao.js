import messageModel from "./models/message.model.js";

export default class MessageManagerDao {

    getMessages = async () => {
        try {
            
            const messages = await messageModel.find().lean();
            return messages

        } catch (error) {
            console.log(error)
        }
    }

    createMessage = async (msg) => {

        console.log('msg: ' + msg)
        
        const {user, message} = msg;

        if(!user || !message){
            return {
                incomplete: true
            }
        }
        
        const newMsg = {
            user,
            message,
        }

        try {

            const result = await messageModel.create(newMsg)
            return result;

        } catch (error) {
            console.log(error)
        }
    }

} 