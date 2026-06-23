import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ["Tablets", "Capsules", "Syrups", "Injections", "Other"] },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    gallery: [{ type: String }],
    features: [{ type: String }],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

productSchema.index({ name: "text", category: "text", description: "text" });

export default mongoose.model("Product", productSchema);
