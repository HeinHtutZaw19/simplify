import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
   user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rank:{
        type: Number
    },
    score:{
        luminosity: Number,
        clarity: Number,
        vibrancy: Number
    }

})

const Score = mongoose.model("Score", scoreSchema)
export default Score