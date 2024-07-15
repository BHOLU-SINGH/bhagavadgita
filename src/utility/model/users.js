import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    name: String,   
    email: String,
    gender: String,
    mobile: Number,
    password: String
});

export const User = mongoose.models.users || mongoose.model("users", productModel);