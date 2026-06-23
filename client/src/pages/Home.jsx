import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FlaskConical, Mail, MapPin, Phone, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { certifications, facilities, gallery as defaultGallery, imageBank, productFallbackImages, products as defaultProducts, stats, values } from "../data/siteData.js";

const productStorageKey = "allivin_admin_products";
const galleryStorageKey = "allivin_admin_gallery";

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

export default function Home() {
  const sectionIds = ["home", "about", "products", "facilities", "quality", "certifications", "gallery", "contact"];
  const getHashSection = () => {
    const id = window.location.hash.replace("#", "");
    return sectionIds.includes(id) ? id : "home";
  };
  const [activeSection, setActiveSection] = useState(getHashSection);
  const [publicProducts, setPublicProducts] = useState(() => readStoredItems(productStorageKey, defaultProducts));
  const [publicGallery, setPublicGallery] = useState(() => readStoredItems(galleryStorageKey, defaultGallery));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const categories = ["All", ...new Set(publicProducts.map((product) => product.category))];
  const galleryCategories = ["All", ...new Set(publicGallery.map((item) => item.category))];
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
      <section id="home" data-section="home" className="relative min-h-screen overflow-hidden bg-brand-navy">
        <img src={imageBank.hero} alt="Pharmaceutical laboratory" className="absolute inset-0 h-full w-full object-cover opacity-42" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/86 to-brand-blue/40" />
        <div className="section-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow text-cyan-200">Premium Pharmaceutical Manufacturing</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">Innovating Healthcare Through Quality Manufacturing</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">Allivin Laboratories delivers dependable tablets, capsules, syrups, injectables, and formulation support through validated processes, disciplined quality systems, and modern manufacturing infrastructure.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="btn-primary bg-white text-brand-navy hover:bg-brand-sky">Explore Products <ArrowRight size={18} /></a>
              <a href="#contact" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-navy">Contact Us</a>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="hidden lg:block">
            <div className="glass rounded-2xl border border-white/20 p-6 shadow-premium">
              <div className="grid gap-4">
                {stats.map(([number, label]) => (
                  <div key={label} className="rounded-xl border border-white/30 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/70">
                    <span className="text-3xl font-extrabold text-brand-blue">{number}</span>
                    <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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

      <section id="gallery" data-section="gallery" className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="section-shell">
          <SectionHeader eyebrow="Gallery" title="A closer look at our facilities, laboratories, and products" />
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {galleryCategories.map((item) => (
              <button key={item} onClick={() => setGalleryFilter(item)} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${galleryFilter === item ? "bg-brand-blue text-white" : "bg-white text-slate-700 hover:text-brand-blue dark:bg-slate-800 dark:text-slate-200"}`}>{item}</button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {filteredGallery.map((item) => (
              <button key={getItemId(item)} onClick={() => setLightbox(item)} className="group relative overflow-hidden rounded-xl text-left shadow-sm">
                <img src={item.image} alt={item.title} onError={(event) => { event.currentTarget.style.display = "none"; }} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 to-transparent p-5 font-bold text-white">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" data-section="contact" className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader align="left" eyebrow="Contact Us" title="Start a manufacturing conversation with Allivin Laboratories" text="Share your formulation, business inquiry, or partnership requirement and our team will respond promptly." />
            <div className="grid gap-4">
              <p className="flex gap-3 text-slate-700 dark:text-slate-200"><MapPin className="text-brand-teal" /> Industrial Pharma Park, Hyderabad, Telangana, India</p>
              <p className="flex gap-3 text-slate-700 dark:text-slate-200"><Mail className="text-brand-teal" /> info@allivinlabs.com</p>
              <p className="flex gap-3 text-slate-700 dark:text-slate-200"><Phone className="text-brand-teal" /> +91 98765 43210</p>
            </div>
          </div>
          <Reveal className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-premium dark:border-slate-800 dark:bg-slate-900">
            <iframe title="Allivin Laboratories map" className="h-[430px] w-full border-0" loading="lazy" src="https://www.google.com/maps?q=Hyderabad%20Pharma%20City&output=embed" />
          </Reveal>
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
