import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ["Manufacturing", "Laboratory", "Products", "Certifications"] },
    image: { type: String, required: true },
    alt: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("GalleryImage", galleryImageSchema);
