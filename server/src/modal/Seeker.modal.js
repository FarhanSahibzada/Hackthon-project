import mongoose from "mongoose";

const seekerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Cnic: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required: true
    }

}, { timestamps: true })


export const Recipation = mongoose.model("Recipation", seekerSchema)