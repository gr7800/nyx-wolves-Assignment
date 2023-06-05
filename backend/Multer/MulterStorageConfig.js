const multer = require("multer");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Set the destination folder for file uploads
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    // Set the filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    callback(null, filename);
  },
});

// Configure file filter
const fileFilter = (req, file, callback) => {
  // Check if the file type is allowed
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(new Error("Only .png, .jpg, and .jpeg formats are allowed."));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
