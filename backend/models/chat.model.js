import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    openaiResponse: {
        type: String,
        required: false
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;