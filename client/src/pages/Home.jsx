import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Award, Box, CheckCircle2, Clock, Factory, Facebook, FileCheck2, FlaskConical, Headphones, Instagram, Linkedin, Mail, MapPin, PackageCheck, Phone, Pill, Search, ShieldCheck, Syringe, Truck, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { certifications, facilities, gallery as defaultGallery, imageBank, productFallbackImages, products as defaultProducts, stats, values } from "../data/siteData.js";

const productStorageKey = "allivin_admin_products";
const galleryStorageKey = "allivin_admin_gallery_v3";
const contactStorageKey = "allivin_admin_contact";

const defaultContact = {
  address: "NO.7-55, ROAD.NO.13, SATYANARAYANAPURAM, PARVATHAPUR, MEDIPALLY, MEDCHAL DIST., Parvatapur(V), Medipally(M), MEDCHAL MALKAJGIRI(Dist), Telangana, India",
  email: "allvinlaboratories2022@gmail.com",
  phone: "+91 96663 43024",
  hours: "Mon - Sat : 9:00 AM - 6:00 PM\nSunday : Closed"
};

function getItemId(item) {
  return item._id || item.id || item.title || item.name;
}

function readStoredItems(key, fallbackItems) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "null");
    if (Array.isArray(stored)) return stored;
  } catch {
    localStorage.removeItem(key);
  }
  return fallbackItems;
}

function readStoredObject(key, fallbackItem) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "null");
    if (stored && typeof stored === "object" && !Array.isArray(stored)) return { ...fallbackItem, ...stored };
  } catch {
    localStorage.removeItem(key);
  }
  return fallbackItem;
}

function phoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default function Home() {
  const sectionIds = ["home", "about", "products", "facilities", "quality", "certifications", "gallery", "contact"];
  const getHashSection = () => {
    const id = window.location.hash.replace("#", "");
    return sectionIds.includes(id) ? id : "home";
  };
  const [activeSection, setActiveSection] = useState(getHashSection);
  const [publicProducts, setPublicProducts] = useState(() => readStoredItems(productStorageKey, defaultProducts));
  const [publicGallery, setPublicGallery] = useState(() => readStoredItems(galleryStorageKey, defaultGallery));
  const [contactInfo, setContactInfo] = useState(() => readStoredObject(contactStorageKey, defaultContact));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = ["All", ...new Set(publicProducts.map((product) => product.category))];
  const galleryCategories = ["All", "Laboratory", "Manufacturing", "Quality Testing", "Products", "Packaging"];
  const homeStats = [
    { icon: Award, number: "5+", label: "Years of Experience" },
    { icon: Box, number: "120+", label: "Products Manufactured" },
    { icon: Users, number: "150+", label: "Clients Served" },
    { icon: FileCheck2, number: "12+", label: "Certifications Achieved" },
    { icon: ShieldCheck, number: "99%", label: "Quality Compliance" },
    { icon: Factory, number: "100%", label: "GMP Certified Facility" }
  ];
  const productCategories = [
    {
      category: "Tablets",
      icon: Pill,
      color: "text-brand-blue",
      text: "High-quality tablet formulations for various therapeutic needs."
    },
    {
      category: "Capsules",
      icon: Pill,
      color: "text-brand-teal",
      text: "Reliable capsule formulations manufactured to quality standards."
    },
    {
      category: "Syrups",
      icon: FlaskConical,
      color: "text-violet-600",
      text: "Liquid formulations designed for patient convenience and stability."
    },
    {
      category: "Injections",
      title: "Injectables",
      icon: Syringe,
      color: "text-orange-600",
      text: "Sterile injectable products manufactured under strict quality controls."
    }
  ].map((item) => ({
    ...item,
    title: item.title || item.category,
    image: publicProducts.find((product) => product.category === item.category)?.image || productFallbackImages[item.category]
  }));
  const whyChoose = [
    { icon: Award, title: "GMP Certified Manufacturing", text: "International quality standards with GMP compliance." },
    { icon: Factory, title: "Modern Infrastructure", text: "Advanced machinery and technology for precision manufacturing." },
    { icon: Users, title: "Experienced Team", text: "Skilled professionals ensuring quality and excellence." },
    { icon: ShieldCheck, title: "Quality Assurance", text: "Rigorous quality control at every stage of manufacturing." }
  ];
  const processSteps = [
    { icon: Pill, title: "Raw Materials", text: "Sourced Carefully" },
    { icon: Factory, title: "Production", text: "Controlled Process" },
    { icon: FlaskConical, title: "Quality Testing", text: "Multi-level Testing" },
    { icon: PackageCheck, title: "Packaging", text: "Safe & Secure" },
    { icon: Truck, title: "Distribution", text: "On-time Delivery" }
  ];
  const filteredProducts = useMemo(() => publicProducts.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesQuery = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query, publicProducts]);
  const filteredGallery = publicGallery.filter((item) => galleryFilter === "All" || item.category === galleryFilter);

  useEffect(() => {
    const syncSection = () => {
      setActiveSection(getHashSection());
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    syncSection();
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, []);

  useEffect(() => {
    const syncAdminChanges = (event) => {
      if (!event || event.key === productStorageKey) setPublicProducts(readStoredItems(productStorageKey, defaultProducts));
      if (!event || event.key === galleryStorageKey) setPublicGallery(readStoredItems(galleryStorageKey, defaultGallery));
      if (!event || event.key === contactStorageKey) setContactInfo(readStoredObject(contactStorageKey, defaultContact));
    };
    syncAdminChanges();
    window.addEventListener("storage", syncAdminChanges);
    window.addEventListener("focus", syncAdminChanges);
    return () => {
      window.removeEventListener("storage", syncAdminChanges);
      window.removeEventListener("focus", syncAdminChanges);
    };
  }, []);

  return (
    <main className="section-page" data-active-section={activeSection}>
      <section id="home" data-section="home" className="min-h-screen overflow-hidden bg-white text-brand-navy dark:bg-slate-950">
        <div className="relative overflow-hidden">
          <img src={imageBank.production} alt="Pharmaceutical manufacturing facility" className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-35 lg:w-[70%] lg:opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/96 to-white/35 dark:from-slate-950 dark:via-slate-950/92 dark:to-slate-950/35" />
          <div className="section-shell relative py-12 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <Reveal className="flex min-h-[390px] flex-col justify-center">
                <p className="eyebrow">Premium Pharmaceutical Manufacturing</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl xl:text-6xl dark:text-white">
                  Trusted Pharmaceutical Manufacturing Partner for Quality <span className="text-brand-blue">Healthcare Solutions</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">
                  We manufacture high-quality tablets, capsules, syrups, and injectable formulations with advanced technology, strict quality control, and regulatory compliance.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href="#products" className="btn-primary">Explore Products <ArrowRight size={18} /></a>
                  <a href="#contact" className="btn-secondary">Contact Us <ArrowRight size={18} /></a>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="flex items-start justify-end">
                <div className="grid w-full max-w-3xl gap-3 rounded-xl bg-white/88 p-3 shadow-premium backdrop-blur md:grid-cols-3 dark:bg-slate-900/88">
                  {[
                    ["WHO-GMP", "Certified"],
                    ["ISO 9001:2015", "Certified"],
                    ["GMP Certified", "Facility"]
                  ].map(([title, label], index) => (
                    <div key={title} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                      <Award className="text-brand-blue" size={28} />
                      <div>
                        <p className="text-sm font-extrabold text-brand-navy dark:text-white">{title}</p>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="section-shell -mt-4 relative z-10">
          <Reveal className="grid gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-premium md:grid-cols-3 xl:grid-cols-6 dark:border-slate-800 dark:bg-slate-900">
            {homeStats.map(({ icon: Icon, number, label }) => (
              <div key={label} className="flex items-center gap-3 border-slate-200 px-2 py-3 xl:border-r xl:last:border-r-0 dark:border-slate-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-brand-blue dark:bg-blue-950">
                  <Icon size={25} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-blue">{number}</p>
                  <p className="text-xs font-bold leading-5 text-slate-700 dark:text-slate-300">{label}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="section-shell py-8">
          <Reveal>
            <h2 className="text-center text-2xl font-extrabold text-brand-navy dark:text-white">Our Product Categories</h2>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productCategories.map(({ category, title, icon: Icon, image, color, text }, index) => (
              <Reveal key={category} delay={index * 0.04} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
                <div className="relative">
                  <img src={image} alt={title} onError={(event) => { event.currentTarget.src = productFallbackImages[category]; }} className="h-36 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-950">
                    <Icon className={color} size={28} />
                  </div>
                </div>
                <div className="p-6 pt-9">
                  <h3 className="text-xl font-extrabold text-brand-navy dark:text-white">{title}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
                  <a href={`#products`} onClick={() => setCategory(category)} className={`mt-5 inline-flex items-center gap-2 text-sm font-extrabold ${color}`}>
                    View Products <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">Why Choose Allivin Laboratories?</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {whyChoose.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-3 border-r border-slate-200 pr-4 last:border-r-0 dark:border-slate-800">
                    <Icon className="mt-1 shrink-0 text-brand-blue" size={26} />
                    <div>
                      <h3 className="text-sm font-extrabold text-brand-navy dark:text-white">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">Our Manufacturing Process</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-5">
                {processSteps.map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className="relative text-center">
                    {index < processSteps.length - 1 && <span className="absolute left-[58%] top-8 hidden h-px w-[70%] bg-slate-300 sm:block dark:bg-slate-700" />}
                    <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-200 bg-white text-brand-blue shadow-sm dark:border-blue-900 dark:bg-slate-900">
                      <Icon size={28} />
                    </div>
                    <h3 className="mt-3 text-xs font-extrabold text-brand-navy dark:text-white">{title}</h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="about" data-section="about" className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell">
          <SectionHeader eyebrow="About Us" title="A trusted manufacturing partner for modern healthcare brands" text="Allivin Laboratories combines disciplined pharmaceutical operations with responsive commercial support for clients, investors, distributors, and healthcare partners." />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <img src={imageBank.lab} alt="Allivin research laboratory" className="h-full min-h-96 w-full rounded-2xl object-cover shadow-premium" />
            </Reveal>
            <div className="grid gap-5">
              {[
                ["Mission", "To manufacture safe, effective, and accessible pharmaceutical products through quality-led operations."],
                ["Vision", "To become a respected formulation manufacturing partner known for reliability, innovation, and compliance."],
                ["Why Choose Allivin Laboratories", "Modern facilities, experienced technical teams, transparent documentation, and dependable delivery discipline."]
              ].map(([title, text], index) => (
                <Reveal delay={index * 0.06} key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xl font-bold text-brand-navy dark:text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.05} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
                <Icon className="text-brand-teal" size={30} />
                <h3 className="mt-5 font-bold text-brand-navy dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="products" data-section="products" className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="section-shell">
          <SectionHeader eyebrow="Products" title="Formulation categories built for quality, scale, and consistency" text="Search and filter Allivin Laboratories' core manufacturing capabilities." />
          <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
            <label className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input className="input pl-12" placeholder="Search products, formulations, categories..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${category === item ? "bg-brand-blue text-white" : "bg-white text-slate-700 hover:text-brand-blue dark:bg-slate-800 dark:text-slate-200"}`}>{item}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <Reveal key={getItemId(product)} delay={index * 0.04} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = productFallbackImages[product.category];
                  }}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand-blue dark:bg-blue-950">{product.category}</span>
                  <h3 className="mt-4 text-lg font-bold text-brand-navy dark:text-white">{product.name}</h3>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>
                  <Link to={`/products/${getItemId(product)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-blue">View Details <ArrowRight size={16} /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="facilities" data-section="facilities" className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell">
          <SectionHeader eyebrow="Manufacturing Facilities" title="Infrastructure designed for reliable pharmaceutical output" text="Each facility zone supports controlled production, testing, packaging, and storage workflows." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ icon: Icon, title, text, image }, index) => (
              <Reveal key={title} delay={index * 0.05} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900">
                <img src={image} alt={title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-6">
                  <Icon className="text-brand-teal" size={30} />
                  <h3 className="mt-4 text-xl font-bold text-brand-navy dark:text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" data-section="quality" className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="section-shell">
          <SectionHeader eyebrow="Quality Assurance" title="Quality systems that protect every formulation" text="Allivin Laboratories follows documented checkpoints from raw material receipt through final dispatch." />
          <div className="grid gap-6 lg:grid-cols-4">
            {["GMP Standards", "WHO Guidelines", "Quality Testing Process", "Safety Procedures"].map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="relative rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-sky text-brand-blue"><CheckCircle2 /></div>
                <div className="mt-6 text-4xl font-extrabold text-slate-200 dark:text-slate-800">0{index + 1}</div>
                <h3 className="mt-3 text-lg font-bold text-brand-navy dark:text-white">{item}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Validated documentation, controlled review, trained operators, and clear escalation for deviations.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" data-section="certifications" className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell">
          <SectionHeader eyebrow="Certifications" title="Compliance credentials that strengthen partner confidence" text="Professional certification cards for GMP, ISO, and WHO-aligned manufacturing expectations." />
          <div className="grid gap-6 md:grid-cols-3">
            {certifications.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.05} className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-brand-blue shadow-lg dark:bg-slate-800">
                  <Icon size={34} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-brand-navy dark:text-white">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" data-section="gallery" className="min-h-screen bg-slate-950 py-20 text-white">
        <div className="section-shell">
          <Reveal className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_34%),linear-gradient(135deg,#07111f_0%,#0b1d33_52%,#06101d_100%)] px-5 py-14 shadow-premium sm:px-10 lg:px-14">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
            <div className="relative max-w-4xl">
              <p className="eyebrow">Gallery</p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                A Closer Look at Our Facilities, Laboratories & Products
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore our pharmaceutical manufacturing facilities, research laboratories, quality testing units, and product categories through our visual gallery.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 flex flex-wrap justify-center gap-3">
            {galleryCategories.map((item) => (
              <button
                key={item}
                onClick={() => setGalleryFilter(item)}
                className={`rounded-full border px-5 py-2.5 text-sm font-extrabold transition ${
                  galleryFilter === item
                    ? "border-brand-blue bg-brand-blue text-white shadow-lg shadow-blue-900/30"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-brand-teal hover:bg-brand-teal/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredGallery.map((item, index) => (
              <Reveal key={getItemId(item)} delay={index * 0.04}>
                <button
                  onClick={() => setLightbox(item)}
                  className="group relative block h-80 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-left shadow-2xl shadow-slate-950/30"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = imageBank.lab;
                    }}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/20 to-transparent opacity-90 transition group-hover:bg-slate-950/45" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-xs font-bold text-cyan-100 backdrop-blur">
                    {item.category}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-5">
                    <span className="block text-xl font-extrabold leading-snug text-white">{item.title}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.06] p-7 text-center shadow-premium">
            <p className="text-lg font-semibold leading-8 text-slate-200">
              Our facilities are designed to maintain the highest standards of quality, safety, and efficiency across all operations.
            </p>
            <a href="#contact" className="btn-primary mt-6">
              Contact Us <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="contact" data-section="contact" className="min-h-screen bg-[#06111f] text-white">
        <div className="section-shell py-12 lg:py-16">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
                Start a manufacturing conversation with <span className="text-brand-teal">Allivin Laboratories</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                Share your formulation, business inquiry, or partnership requirement and our team will respond promptly.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    text: contactInfo.email,
                    wide: true
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    text: contactInfo.phone
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    text: "Mon - Sat : 9:00 AM - 6:00 PM"
                  }
                ].map(({ icon: Icon, title, text, wide }) => (
                  <div key={title} className={`rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-brand-teal/50 hover:bg-white/[0.07] ${wide ? "md:col-span-2" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/20 text-brand-teal">
                        <Icon size={22} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-extrabold leading-6 text-white">{title}</h3>
                        <p className={`mt-1 text-sm leading-6 text-slate-300 ${title === "Email Us" ? "break-all" : ""} ${title === "Call Us" ? "whitespace-nowrap" : ""}`}>{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-premium">
              <iframe
                title="Allivin Laboratories map"
                className="h-[360px] w-full border-0 lg:h-[430px]"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
              />
              <div className="border-t border-white/10 bg-slate-950/70 p-5 text-slate-300">
                <div className="flex gap-4">
                  <MapPin className="mt-1 shrink-0 text-brand-teal" size={22} />
                  <div>
                    <h3 className="text-base font-extrabold text-white">Our Location</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-8 rounded-xl border border-white/10 bg-white/[0.06] p-6 shadow-premium">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg shadow-blue-900/30">
                  <Headphones size={32} />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold">Have questions or business requirements?</h2>
                  <p className="mt-2 text-slate-300">Contact our team directly through phone or email.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={phoneHref(contactInfo.phone)} className="btn-primary min-w-44"><Phone size={18} /> Call Now</a>
                <a href={`mailto:${contactInfo.email}`} className="inline-flex min-w-44 items-center justify-center gap-2 rounded-lg border border-brand-teal/70 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-brand-teal/15"><Mail size={18} /> Email Us</a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-white/10 bg-[#071827]">
          <div className="section-shell grid gap-10 py-10 md:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr_0.9fr_1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                  <ShieldCheck size={34} />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold">Allivin</h2>
                  <p className="text-sm font-extrabold tracking-[0.25em] text-brand-teal">LABORATORIES</p>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
                Committed to quality, innovation, and excellence in pharmaceutical manufacturing.
              </p>
            </div>

            <div>
              <h3 className="font-extrabold">Quick Links</h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                {[
                  ["Home", "#home"],
                  ["About Us", "#about"],
                  ["Products", "#products"],
                  ["Manufacturing Facilities", "#facilities"],
                  ["Contact Us", "#contact"]
                ].map(([label, href]) => <a key={label} href={href} className="transition hover:text-brand-teal">{label}</a>)}
              </div>
            </div>

            <div>
              <h3 className="font-extrabold">Our Products</h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                {["Tablets", "Capsules", "Syrups", "Injectables"].map((label) => <a key={label} href="#products" className="transition hover:text-brand-teal">{label}</a>)}
              </div>
            </div>

            <div>
              <h3 className="font-extrabold">Contact Info</h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <span className="flex gap-3"><Phone className="shrink-0 text-brand-teal" size={18} /> {contactInfo.phone}</span>
                <span className="flex gap-3"><Mail className="shrink-0 text-brand-teal" size={18} /> {contactInfo.email}</span>
                <span className="flex gap-3"><MapPin className="shrink-0 text-brand-teal" size={18} /> {contactInfo.address}</span>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold">Follow Us</h3>
              <div className="mt-5 flex gap-3">
                {[
                  [Facebook, "Facebook"],
                  [Linkedin, "LinkedIn"],
                  [Instagram, "Instagram"]
                ].map(([Icon, label]) => (
                  <a key={label} href="#" aria-label={label} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-white transition hover:-translate-y-1 hover:bg-brand-blue">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/86 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close lightbox" onClick={() => setLightbox(null)} className="absolute right-5 top-5 rounded-lg bg-white p-2 text-brand-navy"><X /></button>
            <motion.img src={lightbox.image} alt={lightbox.title} className="max-h-[82vh] max-w-5xl rounded-xl object-contain" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
