import mongoose from "mongoose";

const locationDataSchema = new mongoose.Schema({
    lat: { 
        type: String, 
        required: true
    },
    lng: { 
        type: String, 
        required: true
    },
    searchQuery: {
        type: String, 
        required: true
    }
});


const historySchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true,
    },
    data: locationDataSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const HistoryModal = mongoose.models.History || mongoose.model('History', historySchema); // first call I just need to create this model!

export default HistoryModal