import express from "express";
import { createGalleryImage, deleteGalleryImage, getGallery } from "../controllers/galleryController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", protect, upload.single("imageFile"), createGalleryImage);
router.delete("/:id", protect, deleteGalleryImage);

export default router;
