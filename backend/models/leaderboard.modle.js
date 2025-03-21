import mongoose from "mongoose"

const leaderboardSchema = new mongoose.Schema({
    users:[{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    
})

const LeaderBoard = mongoose.model("LeaderBoard", leaderboardSchema)
export default LeaderBoard