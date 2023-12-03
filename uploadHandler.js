// uploadHandler.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("./imageSchema"); // Import the Image model/schema

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads/"); // Adjust the path to an absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"]; // Define allowed MIME types
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, and GIF files are allowed."
        )
      );
    }
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new Image({
      imageData: req.file.filename,
      title,
      description,
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

module.exports = router;
