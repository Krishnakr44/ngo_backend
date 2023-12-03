// imageRoutes.js
const express = require("express");
const router = express.Router();
const Image = require("./imageSchema");

router.get("/", async (req, res) => {
  try {
    const images = await Image.find({}, "-__v");
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findOne({ imageUrl: req.params.id });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", "image/*");
    res.send(image.imageData);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
});

module.exports = router;
