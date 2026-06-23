import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

function signToken(admin) {
  return jwt.sign({ id: admin._id || admin.id, role: admin.role }, process.env.JWT_SECRET || "development-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const fallbackEmail = process.env.ADMIN_EMAIL || "admin@allivinlabs.com";
  const fallbackPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

  if (mongoose.connection.readyState !== 1) {
    if (email === fallbackEmail && password === fallbackPassword) {
      const admin = { id: "dev-admin", name: "Allivin Administrator", email: fallbackEmail, role: "admin" };
      return res.json({ token: signToken(admin), admin });
    }
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({
    token: signToken(admin),
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
  });
}

export async function profile(req, res) {
  res.json(req.admin);
}
