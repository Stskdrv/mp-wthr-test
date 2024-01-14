import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    query: { 
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const HistoryModal = mongoose.models.History || mongoose.model('History', historySchema); // first call I just need to create this model!

export default HistoryModal