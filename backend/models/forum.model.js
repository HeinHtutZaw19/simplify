import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    answers:[{
        type: String,
        required: true
    }]
},{
    timestamps: true
});

const Forum = mongoose.model("Forum", forumSchema);

export default Forum;