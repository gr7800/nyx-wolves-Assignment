const mongoose = require("mongoose");
const validator = require("validator");

// Define the schema for the users collection
const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    datecreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
