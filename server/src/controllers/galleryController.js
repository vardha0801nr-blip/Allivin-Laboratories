import GalleryImage from "../models/GalleryImage.js";

export async function getGallery(req, res) {
  const query = req.query.category ? { category: req.query.category } : {};
  const images = await GalleryImage.find(query).sort({ createdAt: -1 });
  res.json(images);
}

export async function createGalleryImage(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.image = `/uploads/${req.file.filename}`;
  const image = await GalleryImage.create(payload);
  res.status(201).json(image);
}

export async function deleteGalleryImage(req, res) {
  const image = await GalleryImage.findByIdAndDelete(req.params.id);
  if (!image) return res.status(404).json({ message: "Gallery image not found" });
  res.json({ message: "Gallery image deleted" });
}
