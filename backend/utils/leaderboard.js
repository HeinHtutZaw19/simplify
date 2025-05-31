import express from 'express';
import User from '../models/user.model.js';

const leaderboard = express.Router();

const getLeaderBoard = async () => {
    try {
        const leaderboard = await User.find({ email: { $ne: 'admin@admin.com' } })
            .select('username pfp streak point')
            .sort({ point: -1 })
            .exec();
        console.log("Fetch users success:", leaderboard.length, "users found");
        return leaderboard;
    }
    catch (e) {
        console.error('Error fetching leaderboard:', e.message);
        throw error;
    }
}

const getHomeLeaderBoard = async (username) => {
    try {
        const leaderboard = await User.find({ email: { $ne: 'admin@admin.com' } })
            .select('username pfp streak point')
            .sort({ point: -1 })
            .exec();
        console.log("Fetch users success:", leaderboard.length, "users found");
        const userIndex = leaderboard.findIndex(user => user.username === username);
        const length = leaderboard.length;
        let start = 0;
        let end = 0;
        if (userIndex < 2) {
            if (userIndex == 1) {
                start = userIndex - 1;
                end = userIndex + 3;
            }
            else {
                start = userIndex;
                end = userIndex + 4;
            }
        }
        else if (userIndex > length - 3) {
            if (userIndex == length - 2) {
                start = userIndex - 3;
                end = userIndex + 1;
            }
            else {
                start = userIndex - 4;
                end = userIndex;
            }
        }
        else {
            start = userIndex - 2;
            end = userIndex + 2;
        }

        const homeboard = leaderboard.slice(start, end + 1);
        return homeboard;
    }
    catch (e) {
        console.error('Error fetching home leaderboard:', e.message);
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

leaderboard.get('/api/:username/homeleaderboard', async (req, res) => {
    try {
        const username = req.params.username;
        const leaderboard = await getHomeLeaderBoard(username);
        console.log("Home Leaderboard fetch success:", leaderboard);
        res.status(200).json(leaderboard);
    }
    catch (e) {
        console.error("Error fetching Leaderboard:", e.message);
        res.status(500).send(e);
    }
})

export default leaderboard;