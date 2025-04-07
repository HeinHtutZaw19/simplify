import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: false
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;