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
    imageUrl: {
        type: String
    }
})

const Feedback = mongoose.model("FeedBack", feedbackSchema);
export default Feedback;