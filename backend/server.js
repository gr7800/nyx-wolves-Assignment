require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/UserRoute")
const PORT = process.env.PORT || 8000;

// Connect to the database
let Connect = require("./Config/db")

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use("/uploads", express.static("./uploads"));
app.use("/files", express.static("./public/files"));

// Set up routes
app.use(router);

// Start the server
app.listen(PORT, () => {
    Connect
    console.log(`Server started on port ${PORT}`);
});
