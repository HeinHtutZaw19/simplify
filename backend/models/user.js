import mongoose from 'mongoose';

// Define a Mongoose schema for the user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // hash later
});

const User = mongoose.model('User', userSchema);
export default User;