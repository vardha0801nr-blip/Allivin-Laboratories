import {
  Award,
  Beaker,
  Building2,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Tablets
} from "lucide-react";

export const imageBank = {
  hero: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1800&q=85",
  lab: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
  production: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=85",
  packaging: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=85",
  storage: "https://images.unsplash.com/photo-1581093458791-9d15482442f6?auto=format&fit=crop&w=1200&q=85"
};

export const stats = [
  ["5+", "Years of Experience"],
  ["120+", "Products Manufactured"],
  ["150+", "Clients Served"],
  ["12", "Certifications"]
];

export const values = [
  { icon: ShieldCheck, title: "Quality First", text: "Every batch follows documented quality systems, in-process controls, and release checks." },
  { icon: HeartPulse, title: "Patient Safety", text: "Our manufacturing decisions are guided by therapeutic reliability and patient well-being." },
  { icon: Sparkles, title: "Continuous Improvement", text: "We keep upgrading processes, training, and equipment to meet modern pharma expectations." },
  { icon: CheckCircle2, title: "Ethical Operations", text: "Transparent documentation, validated workflows, and dependable partner communication." }
];

const productCategoryImages = {
  Tablets: [
    "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1631549916768-4119b4123a21?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=85"
  ],
  Capsules: [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85"
  ],
  Syrups: [
    "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1583912267550-d44cbb4c64bb?auto=format&fit=crop&w=900&q=85"
  ],
  Injections: [
    "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85"
  ]
};

export const productFallbackImages = {
  Tablets: "/images/products/tablets.png",
  Capsules: "/images/products/capsules.png",
  Syrups: "/images/products/syrups.png",
  Injections: "/images/products/injections.png"
};

export const productDetailDefaults = {
  Tablets: {
    uses: "Used for accurate oral dosing, patient-friendly administration, and stable solid dosage delivery.",
    applications: "Commonly applied in general medicine, nutraceuticals, antacid products, vitamins, analgesics, and prescription formulations.",
    quality: "Manufactured with checks for weight variation, hardness, friability, disintegration, dissolution, and coating uniformity.",
    contactPhone: "+91 98765 43210"
  },
  Capsules: {
    uses: "Used for encapsulating powders, granules, oils, probiotics, herbal blends, vitamins, and sensitive ingredients.",
    applications: "Suitable for antibiotics, multivitamins, probiotics, herbal products, delayed-release products, and specialty formulations.",
    quality: "Manufactured with fill-weight control, shell integrity checks, moisture protection, visual inspection, and packaging review.",
    contactPhone: "+91 98765 43210"
  },
  Syrups: {
    uses: "Used for liquid oral dosing where palatability, easy swallowing, and flexible administration are important.",
    applications: "Commonly used in pediatric products, cough preparations, antacid liquids, vitamin tonics, herbal syrups, and antihistamines.",
    quality: "Manufactured with blending uniformity, pH checks, viscosity review, microbial controls, filtration, and fill-volume accuracy.",
    contactPhone: "+91 98765 43210"
  },
  Injections: {
    uses: "Used for sterile injectable delivery where rapid action, controlled dosage, and clinical reliability are required.",
    applications: "Suitable for antibiotics, vitamins, analgesics, anti-inflammatory products, electrolyte solutions, and critical care injectables.",
    quality: "Manufactured with sterility focus, particulate inspection, batch documentation, controlled filling, and strict quality release.",
    contactPhone: "+91 98765 43210"
  }
};

export const products = [
  {
    id: "tab-01",
    category: "Tablets",
    name: "Film Coated Tablets",
    description: "Precision-compressed tablets for consistent dissolution, stability, and patient compliance.",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-02",
    category: "Tablets",
    name: "Uncoated Tablets",
    description: "Reliable immediate-release tablets manufactured with strict weight variation and hardness checks.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-03",
    category: "Tablets",
    name: "Chewable Tablets",
    description: "Patient-friendly chewable formulations designed for taste, texture, and dosage consistency.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-04",
    category: "Tablets",
    name: "Dispersible Tablets",
    description: "Fast-dispersing tablets suitable for convenient administration and controlled disintegration.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-05",
    category: "Tablets",
    name: "Sustained Release Tablets",
    description: "Modified-release tablets developed for controlled drug release and longer therapeutic coverage.",
    image: "https://images.unsplash.com/photo-1631549916768-4119b4123a21?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-06",
    category: "Tablets",
    name: "Enteric Coated Tablets",
    description: "Specialized coated tablets designed to resist gastric conditions and release in the intestine.",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-07",
    category: "Tablets",
    name: "Multivitamin Tablets",
    description: "Nutritional tablet formulations produced with uniform blending and stable packaging support.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "tab-08",
    category: "Tablets",
    name: "Antacid Tablets",
    description: "Digestive support tablets manufactured for palatability, stability, and dependable dose uniformity.",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-01",
    category: "Capsules",
    name: "Hard Gelatin Capsules",
    description: "Capsule formulations manufactured with strict fill-weight accuracy and clean packaging controls.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-02",
    category: "Capsules",
    name: "Soft Gelatin Capsules",
    description: "Softgel formulations suitable for oils, vitamins, and specialized liquid-fill dosage forms.",
    image: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-03",
    category: "Capsules",
    name: "Vegetarian Capsules",
    description: "Plant-based capsule solutions for modern nutraceutical and pharmaceutical product lines.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-04",
    category: "Capsules",
    name: "Delayed Release Capsules",
    description: "Capsule products designed for delayed release using suitable shell and fill strategies.",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-05",
    category: "Capsules",
    name: "Antibiotic Capsules",
    description: "High-precision capsule filling for antibiotic formulations with clean batch documentation.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-06",
    category: "Capsules",
    name: "Probiotic Capsules",
    description: "Moisture-conscious probiotic capsule products supported by careful packaging controls.",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-07",
    category: "Capsules",
    name: "Herbal Capsules",
    description: "Herbal and botanical capsule dosage forms produced with uniform fill-weight review.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "cap-08",
    category: "Capsules",
    name: "Multivitamin Capsules",
    description: "Vitamin and mineral capsule products designed for consistent blends and shelf stability.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-01",
    category: "Syrups",
    name: "Oral Liquid Syrups",
    description: "Palatable oral liquids produced with controlled blending, filtration, and filling systems.",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-02",
    category: "Syrups",
    name: "Cough Syrups",
    description: "Cough relief liquid formulations manufactured for taste, viscosity, and dosing accuracy.",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-03",
    category: "Syrups",
    name: "Pediatric Syrups",
    description: "Child-friendly oral liquids with palatable flavors and carefully controlled fill volumes.",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-04",
    category: "Syrups",
    name: "Antacid Syrups",
    description: "Digestive support syrups produced with uniform suspension and bottle packaging controls.",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-05",
    category: "Syrups",
    name: "Multivitamin Syrups",
    description: "Nutritional syrup formulations designed for consistent taste, color, and ingredient dispersion.",
    image: "https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-06",
    category: "Syrups",
    name: "Herbal Syrups",
    description: "Herbal oral liquid products manufactured with clean blending and filtration workflows.",
    image: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-07",
    category: "Syrups",
    name: "Antihistamine Syrups",
    description: "Allergy-support liquid formulations produced with reliable dosing and packaging systems.",
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "syr-08",
    category: "Syrups",
    name: "Iron Tonic Syrups",
    description: "Iron and supplement liquid formulations made with stability and palatability in focus.",
    image: "https://images.unsplash.com/photo-1583912267550-d44cbb4c64bb?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-01",
    category: "Injections",
    name: "Sterile Injectables",
    description: "Carefully controlled injectable products supported by aseptic handling and quality review.",
    image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-02",
    category: "Injections",
    name: "Antibiotic Injections",
    description: "Injectable antibiotic formulations supported by controlled processing and documentation.",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-03",
    category: "Injections",
    name: "Vitamin Injections",
    description: "Vitamin injectable products designed for accurate fill, stability, and quality release.",
    image: "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-04",
    category: "Injections",
    name: "Analgesic Injections",
    description: "Pain-management injectable formulations produced under strict quality review systems.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-05",
    category: "Injections",
    name: "Anti-inflammatory Injections",
    description: "Injectable products for inflammation support with careful batch and safety procedures.",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-06",
    category: "Injections",
    name: "Electrolyte Injections",
    description: "Electrolyte injectable solutions supported by controlled filling and inspection processes.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-07",
    category: "Injections",
    name: "Antiemetic Injections",
    description: "Injectable antiemetic formulations developed with stability and quality compliance in focus.",
    image: "https://images.unsplash.com/photo-1580281658626-ee379f3cce93?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "inj-08",
    category: "Injections",
    name: "Critical Care Injections",
    description: "Critical care injectable products manufactured with high attention to process discipline.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=900&q=85"
  }
];

const imageIndexesByCategory = {};

products.forEach((product) => {
  const categoryImages = productCategoryImages[product.category];
  const imageIndex = imageIndexesByCategory[product.category] || 0;
  if (categoryImages) product.image = categoryImages[imageIndex % categoryImages.length];
  Object.assign(product, productDetailDefaults[product.category], product);
  imageIndexesByCategory[product.category] = imageIndex + 1;
});

export const facilities = [
  { icon: Building2, title: "Production Units", text: "Dedicated tablet, capsule, syrup, and formulation lines built for dependable output.", image: imageBank.production },
  { icon: FlaskConical, title: "Research Laboratory", text: "Formulation development, stability review, and process optimization support.", image: imageBank.lab },
  { icon: Beaker, title: "Quality Testing Lab", text: "Analytical testing, microbial checks, and documented quality release systems.", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85" },
  { icon: PackageCheck, title: "Packaging Unit", text: "Blister, bottle, label, and carton workflows with clean line-clearance practices.", image: imageBank.packaging },
  { icon: Tablets, title: "Storage Facilities", text: "Organized raw material, packaging material, and finished goods storage zones.", image: imageBank.storage }
];

export const certifications = [
  { icon: Award, title: "GMP Certified", text: "Manufacturing practices aligned with Good Manufacturing Practice documentation and hygiene standards." },
  { icon: ShieldCheck, title: "ISO Certified", text: "Quality management systems designed around traceability, training, corrective action, and review." },
  { icon: CheckCircle2, title: "WHO Compliant", text: "Processes structured to follow internationally recognized pharmaceutical manufacturing expectations." }
];

export const gallery = [
  { category: "Manufacturing", image: imageBank.production, title: "Modern Production Floor" },
  { category: "Laboratory", image: imageBank.lab, title: "Research Laboratory" },
  { category: "Laboratory", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=85", title: "Quality Testing" },
  { category: "Products", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85", title: "Capsule Products" },
  { category: "Products", image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=1200&q=85", title: "Tablet Range" },
  { category: "Manufacturing", image: imageBank.packaging, title: "Packaging Line" }
];
