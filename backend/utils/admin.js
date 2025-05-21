import express from 'express';
import User from '../models/user.model.js';

const admin = express.Router();

const getUsers = async () => {
    try{
        const allusers = await User.find({ email: {$ne: 'admin@admin.com'}})
            .select('username email point')
            .exec();
        console.log("Fetch users success:", allusers.length, "users found");
        return allusers;
    }
    catch(e){
        console.error('Error fetching all users:', e.message);
        throw error;
    }
}


admin.get('/api/adminlist', async (req, res) => {
    try {
        const allusers = await getUsers();
        console.log("All Users fetch success");
        res.status(200).json(allusers);
    }
    catch (e) {
        console.error("Error fetching Leaderboard:", e.message);
        res.status(500).send(e);
    }
})

admin.delete('/api/deleteuser/:email', async (req, res) => {
    try{
        const { email } = req.params;
        const deletedUser = await User.findOneAndDelete({email: email});
        if(!deletedUser){
            return res.status(404).json({message: 'User not found'});
        }
        console.log('User deleted');
        res.status(200).json({message: 'User sucessfully deleted:', email});
    }
    catch (e) {
        console.error("Error deleting user:", e.message);
        res.status(500).send(e);
    }
})



export default admin;