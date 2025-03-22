import mongoose from "mongoose";

const skinSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    feedback:{
        type: String
    },
    routine:[{
        type: mongoose.Schema.ObjectId,
        ref:"Product"
    }]
})

const Skin = mangoose.model("Skin", skinSchema);
export default Skin;