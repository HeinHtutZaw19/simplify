import express from 'express';
import Leaderboard from '../models/leaderboard.model.js';
import User from '../models/user.model.js';

const leaderboard = express.Router();

const getLeaderBoard = async () => {
    try{
        const leaderboard = await User.find({})
            .select('username streak')
            .sort({streak: -1})
            .limit(20)
            .exec();
        console.log("Fetch users success:", leaderboard.length, "users found");
        return leaderboard;
    }
    catch(e){
        console.error('Error fetching leaderboard:', e.message);
        throw error;
    }
}

leaderboard.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await getLeaderBoard();
        console.log("Leaderboard fetch success");
        res.status(200).json(leaderboard);
    }
    catch (e) {
        console.error("Error fetching Leaderboard:", e.message);
        res.status(500).send(e);
    }
})

export default leaderboard;