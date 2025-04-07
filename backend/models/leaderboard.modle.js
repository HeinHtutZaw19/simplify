const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    isCumulative: {
        type: Boolean,
    },
    isGlobal: {
        type: Boolean,
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;

