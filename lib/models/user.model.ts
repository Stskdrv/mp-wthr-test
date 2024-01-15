import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true},
    firstname: { 
        type: String, 
        required: true
    },
    lastname: { 
        type: String, 
        required: true,
    },
    address: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    tel: {
        type: String, 
        required: true,
        unique: true,
    },
    onboarded: {
        type: Boolean,
        default: false
    }
});

const UserModal = mongoose.models.User || mongoose.model('User', userSchema); // first call I just need to create this model!

export default UserModal;