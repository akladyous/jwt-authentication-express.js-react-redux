import mongoose from "mongoose";
const { Schema } = mongoose;

const SessionSchema = mongoose.Schema({
    sid: { type: String, required: true, unique: true, index: true },
    expires: { type: Number, index: true, required: true },
    data: {},
});


export const Session = mongoose.model('Session', SessionSchema);