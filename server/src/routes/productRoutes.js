import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", protect, upload.single("imageFile"), createProduct);
router.put("/:id", protect, upload.single("imageFile"), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
