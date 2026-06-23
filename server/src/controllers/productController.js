import Product from "../models/Product.js";

export async function getProducts(req, res) {
  const { category, search } = req.query;
  const query = { active: true };
  if (category) query.category = category;
  if (search) query.$text = { $search: search };
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export async function createProduct(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  const product = await Product.create(payload);
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const payload = { ...req.body };
  if (req.file) payload.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  const product = await Product.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
}
