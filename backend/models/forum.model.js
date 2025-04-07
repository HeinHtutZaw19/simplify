import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    answers: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;