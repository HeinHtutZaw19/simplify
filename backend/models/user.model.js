import mongoose from "mongoose";
import Forum from "./forum.model.js"
import Chat from "./chat.model.js"
import Skin from "./feedback.model.js"

const userSchema = new mongoose.Schema({
    pfp: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    region: {
        type: String,
    },
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeedBack',
    },
    routine: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product"
    }],
    streak: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);
export default User;
