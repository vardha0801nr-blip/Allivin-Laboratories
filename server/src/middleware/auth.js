import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Authentication required" });
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development-secret");
    if (mongoose.connection.readyState !== 1 && decoded.id === "dev-admin") {
      req.admin = {
        id: "dev-admin",
        name: "Allivin Administrator",
        email: process.env.ADMIN_EMAIL || "admin@allivinlabs.com",
        role: "admin"
      };
      return next();
    }
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(401).json({ message: "Admin not found" });
    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
