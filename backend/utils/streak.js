import express from 'express';
import User from '../models/user.model.js';

const streak = express.Router();


streak.get('/api/:username/streak', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        const currentDate = new Date();
        const currDay = currentDate.getDate();
        
        const ifConsecutive = user.days.includes(currDay-1);
        const ifToday = user.days.includes(currDay-1);
        if (!ifConsecutive && ifToday ){
            user.streak = 0;
        }
        const streak = user.streak;
        console.log("User Streak fetch success:", streak);
        res.status(200).json(streak);
    }
    catch (e) {
        console.error("Error fetching User Streak:", e.message);
        res.status(500).send(e);
    }
})


streak.get('/api/:username/point', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        const point = user.point;
        console.log("User Point fetch success:", point);
        res.status(200).json(point);
    }
    catch (e) {
        console.error("Error fetching User Point:", e.message);
        res.status(500).send(e);
    }
})

streak.post('/api/updatestreak', async (req, res) => {
    try{
        let user = null;
        if (req.session.user) {
            user = req.session.user;
        }
        const CurrUser = await User.findOne({username: user.username});

        //Get updated date
        const currentDate = new Date();

        const currDay = currentDate.getDate();

        //Update user streak
        if (CurrUser.days.length === 0){
            if(CurrUser.streak > 0){
                CurrUser.streak += 1;
            }
            else{
                CurrUser.streak = 1;
            }
        }
        else if(CurrUser.days.includes(currDay-1)){
            CurrUser.streak += 1;
        }
        else{
            CurrUser.streak = 1;
        }

        CurrUser.point += 10*CurrUser.streak;
        CurrUser.routineDate = currentDate;
        CurrUser.days.push(currDay);

        await CurrUser.save();

        res.status(200).json({ streak: CurrUser.streak,
                routineDate: CurrUser.routineDate,
                days: CurrUser.days,
                point: CurrUser.point,
        });
    }
    catch (e) {
        console.error("Error updating User Streak:", e.message);
        res.status(500).send(e);
    }
})

streak.get('/api/:username/days', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        const days = user.days;
        console.log("User Days fetch success:", days);
        res.status(200).json(days);
    }
    catch (e) {
        console.error("Error fetching User Days:", e.message);
        res.status(500).send(e);
    }
})


export default streak;