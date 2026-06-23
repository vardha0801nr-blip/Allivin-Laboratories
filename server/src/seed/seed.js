import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import CompanyContent from "../models/CompanyContent.js";
import GalleryImage from "../models/GalleryImage.js";
import Product from "../models/Product.js";

dotenv.config();

const productGroups = {
  Tablets: [
    "Film Coated Tablets",
    "Uncoated Tablets",
    "Chewable Tablets",
    "Dispersible Tablets",
    "Sustained Release Tablets",
    "Enteric Coated Tablets",
    "Multivitamin Tablets",
    "Antacid Tablets"
  ],
  Capsules: [
    "Hard Gelatin Capsules",
    "Soft Gelatin Capsules",
    "Vegetarian Capsules",
    "Delayed Release Capsules",
    "Antibiotic Capsules",
    "Probiotic Capsules",
    "Herbal Capsules",
    "Multivitamin Capsules"
  ],
  Syrups: [
    "Oral Liquid Syrups",
    "Cough Syrups",
    "Pediatric Syrups",
    "Antacid Syrups",
    "Multivitamin Syrups",
    "Herbal Syrups",
    "Antihistamine Syrups",
    "Iron Tonic Syrups"
  ],
  Injections: [
    "Sterile Injectables",
    "Antibiotic Injections",
    "Vitamin Injections",
    "Analgesic Injections",
    "Anti-inflammatory Injections",
    "Electrolyte Injections",
    "Antiemetic Injections",
    "Critical Care Injections"
  ]
};

const categoryMeta = {
  Tablets: {
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85",
    description: "Tablet formulations manufactured with strict compression, coating, and quality checks.",
    features: ["Validated compression", "Coating uniformity", "Scalable batches"]
  },
  Capsules: {
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85",
    description: "Capsule formulations manufactured with strict fill-weight accuracy and packaging controls.",
    features: ["Fill-weight control", "Moisture protection", "Blister or bottle packing"]
  },
  Syrups: {
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=900&q=85",
    description: "Oral liquid formulations produced with controlled blending, filtration, and filling systems.",
    features: ["Controlled blending", "Bottle filling", "Labeling support"]
  },
  Injections: {
    image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&q=85",
    description: "Injectable products supported by careful processing, documentation, and quality review.",
    features: ["Sterility focus", "Batch documentation", "Quality release"]
  }
};

const products = Object.entries(productGroups).flatMap(([category, names]) =>
  names.map((name) => ({
    name,
    category,
    description: categoryMeta[category].description,
    image: categoryMeta[category].image,
    features: categoryMeta[category].features
  }))
);

const gallery = [
  { title: "Modern Production Floor", category: "Manufacturing", image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=85" },
  { title: "Research Laboratory", category: "Laboratory", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85" },
  { title: "Quality Testing", category: "Laboratory", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85" },
  { title: "Capsule Products", category: "Products", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85" }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/allivin_laboratories");
  await Promise.all([Admin.deleteMany(), Product.deleteMany(), GalleryImage.deleteMany(), CompanyContent.deleteMany()]);

  await Admin.create({
    email: process.env.ADMIN_EMAIL || "admin@allivinlabs.com",
    password: process.env.ADMIN_PASSWORD || "Admin@12345"
  });
  await Product.insertMany(products);
  await GalleryImage.insertMany(gallery);
  await CompanyContent.create({
    about: "Allivin Laboratories is a pharmaceutical manufacturing company focused on quality formulations and dependable partner service.",
    mission: "To manufacture safe, effective, and accessible pharmaceutical products through quality-led operations.",
    vision: "To become a respected formulation manufacturing partner known for reliability, innovation, and compliance.",
    address: "Industrial Pharma Park, Hyderabad, Telangana, India",
    email: "info@allivinlabs.com",
    phone: "+91 98765 43210",
    certifications: "GMP Certified, ISO Certified, WHO Compliant"
  });

  console.log("Seed complete. Admin email: admin@allivinlabs.com password: Admin@12345");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
