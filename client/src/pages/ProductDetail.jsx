import { ArrowLeft, ClipboardList, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { productDetailDefaults, productFallbackImages, products as defaultProducts } from "../data/siteData.js";

const productStorageKey = "allivin_admin_products";

function getItemId(item) {
  return item._id || item.id;
}

function readProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(productStorageKey) || "null");
    if (Array.isArray(stored)) return stored;
  } catch {
    localStorage.removeItem(productStorageKey);
  }
  return defaultProducts;
}

export default function ProductDetail() {
  const { id } = useParams();
  const products = readProducts();
  const product = products.find((item) => getItemId(item) === id) || products[0];
  const defaults = productDetailDefaults[product.category] || productDetailDefaults.Tablets;
  const detailCards = [
    { icon: Stethoscope, title: "Uses", text: product.uses || defaults.uses },
    { icon: ClipboardList, title: "Applications", text: product.applications || defaults.applications },
    { icon: ShieldCheck, title: "Quality", text: product.quality || defaults.quality }
  ];
  const contactPhone = product.contactPhone || defaults.contactPhone;

  return (
    <main className="bg-slate-50 py-16 dark:bg-slate-900">
      <div className="section-shell">
        <Link to="/#products" className="mb-8 inline-flex items-center gap-2 font-bold text-brand-blue"><ArrowLeft size={18} /> Back to Products</Link>
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium dark:border-slate-800 dark:bg-slate-950 lg:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = productFallbackImages[product.category];
            }}
            className="h-full min-h-96 w-full object-cover"
          />
          <div className="p-8 lg:p-12">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-brand-blue dark:bg-blue-950">{product.category}</span>
            <h1 className="mt-6 text-4xl font-extrabold text-brand-navy dark:text-white">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{product.description}</p>
            <div className="mt-8 grid gap-4">
              {detailCards.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="flex items-center gap-3 font-extrabold text-brand-navy dark:text-white">
                    <Icon className="text-brand-teal" size={22} /> {title}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-950 dark:bg-blue-950/40">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-teal">Contact Details</p>
              <a href={`tel:${contactPhone.replaceAll(" ", "")}`} className="mt-3 flex items-center gap-3 text-xl font-extrabold text-brand-blue">
                <Phone size={23} /> {contactPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
