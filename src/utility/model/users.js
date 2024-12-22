import mongoose from "mongoose";

const bhagavadGitaModel = new mongoose.Schema({
    name: String,   
    email: String,
    gender: String,
    mobile: Number,
    password: String
});

export const User = mongoose.models.bhagavadgita || mongoose.model("bhagavadgita", bhagavadGitaModel);