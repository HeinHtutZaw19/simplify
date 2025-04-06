import mongoose from "mongoose";
import Forum from "./forum.model.js"
import Chat from "./chat.model.js"
import Skin from "./skin.model.js"
import Score from "./score.model.js"

const userSchema = new mongoose.Schema({
    pfp:{
        data: Buffer,
        contentType: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type : Number,
        // required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    region:{
        type: String,
        // required: true
    },
    forum:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        // required: true
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }],
    skin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skin',
    },
    score:{
        luminosity: Number,
        clarity: Number,
        vibrancy: Number,
    },
    rank: Number
},{
    timestamps: true
});
const User = mongoose.model("User", userSchema);

export default User;