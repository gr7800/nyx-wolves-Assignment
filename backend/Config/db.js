// Importing the Mongoose library
const mongoose = require("mongoose");

// Storing the database URL in a constant
const DB_URL = process.env.DB_URL;

// Disabling strict query mode for Mongoose
mongoose.set('strictQuery', false);

// Connecting to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected"); // Success message when the connection is established
}).catch((err) => {
    console.log(err); // Error message if there is an issue connecting to the database
});
