const express = require("express");
const router = express.Router();
const upload = require("../Multer/MulterStorageConfig");
const { registerUser, getUsers, getSingleUser, editUser, deleteUser, changeUserStatus, exportUsers } = require("../Controllers/UserController");

// Register a new user
router.post("/user/register", upload.single("user_profile"), registerUser);

// Get user details with filtering and pagination
router.get("/user/details", getUsers);

// Get a single user by ID
router.get("/user/:id", getSingleUser);

// Edit user details by ID
router.put("/user/edit/:id", upload.single("user_profile"), editUser);

// Delete a user by ID
router.delete("/user/delete/:id", deleteUser);

// Change user status by ID
router.put("/user/status/:id",changeUserStatus);

// Export users to CSV
router.get("/user/export",exportUsers);

module.exports = router;
