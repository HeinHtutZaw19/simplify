import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String
    },
    luminosity: {
        type: Number
    },
    clarity: {
        type: Number
    },
    vibrancy: {
        type: Number
    },
    skinUrl: {
        type: String
    }
})

const FeedBack = mongoose.model("FeedBack", feedbackSchema);
export default FeedBack;