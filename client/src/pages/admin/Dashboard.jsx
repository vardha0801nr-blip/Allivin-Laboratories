import { ImagePlus, LayoutDashboard, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gallery as defaultGallery, productDetailDefaults, productFallbackImages, products as defaultProducts } from "../../data/siteData.js";
import api from "../../services/api.js";

const blankProduct = {
  name: "",
  category: "Tablets",
  description: "",
  image: "",
  uses: "",
  applications: "",
  quality: "",
  contactPhone: "+91 98765 43210"
};
const blankGallery = { title: "", category: "Laboratory", image: "" };
const galleryCategories = ["Laboratory", "Manufacturing", "Quality Testing", "Products", "Packaging"];
const defaultContact = {
  address: "NO.7-55, ROAD.NO.13, SATYANARAYANAPURAM, PARVATHAPUR, MEDIPALLY, MEDCHAL DIST., Parvatapur(V), Medipally(M), MEDCHAL MALKAJGIRI(Dist), Telangana, India",
  email: "info@allivinlabs.com",
  phone: "+91 96663 43024",
  hours: "Mon - Sat : 9:00 AM - 6:00 PM\nSunday : Closed"
};
const productStorageKey = "allivin_admin_products";
const galleryStorageKey = "allivin_admin_gallery_v3";
const contactStorageKey = "allivin_admin_contact";

function getItemId(item) {
  return item._id || item.id;
}

function withAdminIds(items, prefix) {
  return items.map((item, index) => ({
    ...item,
    _id: getItemId(item) || `${prefix}-${Date.now()}-${index}`
  }));
}

function readStoredItems(key, fallbackItems, prefix) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "null");
    if (Array.isArray(stored)) return withAdminIds(stored, prefix);
  } catch {
    localStorage.removeItem(key);
  }
  return withAdminIds(fallbackItems, prefix);
}

function hasStoredItems(key) {
  try {
    return Array.isArray(JSON.parse(localStorage.getItem(key) || "null"));
  } catch {
    return false;
  }
}

function saveStoredItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
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

function saveStoredObject(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">{label}</span>
      {children}
    </label>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [productForm, setProductForm] = useState(blankProduct);
  const [editingProductId, setEditingProductId] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);
  const [galleryForm, setGalleryForm] = useState(blankGallery);
  const [editingGalleryId, setEditingGalleryId] = useState("");
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [contactForm, setContactForm] = useState(defaultContact);
  const [status, setStatus] = useState("");

  async function loadData() {
    const localProducts = readStoredItems(productStorageKey, defaultProducts, "product");
    const localGallery = readStoredItems(galleryStorageKey, defaultGallery, "gallery");
    const shouldKeepLocalProducts = hasStoredItems(productStorageKey);
    const shouldKeepLocalGallery = hasStoredItems(galleryStorageKey);
    setProducts(localProducts);
    setGallery(localGallery);
    setContactForm(readStoredObject(contactStorageKey, defaultContact));
    saveStoredItems(productStorageKey, localProducts);
    saveStoredItems(galleryStorageKey, localGallery);
    saveStoredObject(contactStorageKey, readStoredObject(contactStorageKey, defaultContact));

    try {
      const [productRes, galleryRes] = await Promise.all([
        api.get("/products"),
        api.get("/gallery")
      ]);
      if (!shouldKeepLocalProducts && Array.isArray(productRes.data) && productRes.data.length) {
        const apiProducts = withAdminIds(productRes.data, "product");
        setProducts(apiProducts);
        saveStoredItems(productStorageKey, apiProducts);
      }
      if (!shouldKeepLocalGallery && Array.isArray(galleryRes.data) && galleryRes.data.length) {
        const apiGallery = withAdminIds(galleryRes.data, "gallery");
        setGallery(apiGallery);
        saveStoredItems(galleryStorageKey, apiGallery);
      }
    } catch {
      setStatus("Local dashboard mode enabled. Add, edit, and delete will still work.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function logout() {
    localStorage.removeItem("allivin_token");
    localStorage.removeItem("allivin_admin");
    navigate("/admin-login");
  }

  async function saveProduct(event) {
    event.preventDefault();
    try {
      const uploadedImage = await readFileAsDataUrl(productImageFile);
      let savedProduct = {
        ...productForm,
        image: uploadedImage || productForm.image || productFallbackImages[productForm.category],
        uses: productForm.uses || productDetailDefaults[productForm.category]?.uses,
        applications: productForm.applications || productDetailDefaults[productForm.category]?.applications,
        quality: productForm.quality || productDetailDefaults[productForm.category]?.quality,
        contactPhone: productForm.contactPhone || productDetailDefaults[productForm.category]?.contactPhone,
        _id: editingProductId || `product-${Date.now()}`
      };

      try {
        const payload = new FormData();
        Object.entries(productForm).forEach(([key, value]) => payload.append(key, value));
        if (productImageFile) payload.append("imageFile", productImageFile);
        const { data } = editingProductId
          ? await api.put(`/products/${editingProductId}`, payload)
          : await api.post("/products", payload);
        savedProduct = { ...savedProduct, ...data, _id: getItemId(data) || savedProduct._id };
      } catch {
        // Local mode keeps the dashboard functional when MongoDB/API writes are unavailable.
      }

      const updatedProducts = editingProductId
        ? products.map((product) => (getItemId(product) === editingProductId ? savedProduct : product))
        : [savedProduct, ...products];
      setProducts(updatedProducts);
      saveStoredItems(productStorageKey, updatedProducts);
      setProductForm(blankProduct);
      setEditingProductId("");
      setProductImageFile(null);
      setStatus(editingProductId ? "Product updated successfully." : "Product added successfully.");
    } catch {
      setStatus("Unable to read selected image. Try another image or use an image URL.");
    }
  }

  function editProduct(product) {
    setTab("products");
    setEditingProductId(getItemId(product));
    setProductForm({
      name: product.name || "",
      category: product.category || "Tablets",
      description: product.description || "",
      image: product.image || "",
      uses: product.uses || productDetailDefaults[product.category]?.uses || "",
      applications: product.applications || productDetailDefaults[product.category]?.applications || "",
      quality: product.quality || productDetailDefaults[product.category]?.quality || "",
      contactPhone: product.contactPhone || productDetailDefaults[product.category]?.contactPhone || "+91 98765 43210"
    });
    setStatus("Editing selected product.");
  }

  async function removeProduct(id) {
    try {
      await api.delete(`/products/${id}`);
    } catch {
      // Keep local delete working even when the backend is unavailable.
    }
    const updatedProducts = products.filter((product) => getItemId(product) !== id);
    setProducts(updatedProducts);
    saveStoredItems(productStorageKey, updatedProducts);
    setStatus("Product deleted.");
  }

  async function saveGallery(event) {
    event.preventDefault();
    let uploadedImage = "";
    try {
      uploadedImage = await readFileAsDataUrl(galleryImageFile);
    } catch {
      setStatus("Unable to read selected gallery image. Try another image or use an image URL.");
      return;
    }
    let savedImage = {
      ...galleryForm,
      image: uploadedImage || galleryForm.image,
      _id: editingGalleryId || `gallery-${Date.now()}`
    };
    try {
      const payload = new FormData();
      Object.entries(galleryForm).forEach(([key, value]) => payload.append(key, value));
      if (galleryImageFile) payload.append("imageFile", galleryImageFile);
      const { data } = editingGalleryId
        ? await api.put(`/gallery/${editingGalleryId}`, payload)
        : await api.post("/gallery", payload);
      savedImage = { ...savedImage, ...data, _id: getItemId(data) || savedImage._id };
    } catch {
      // Local mode keeps gallery add/edit working without MongoDB/API writes.
    }
    const updatedGallery = editingGalleryId
      ? gallery.map((item) => (getItemId(item) === editingGalleryId ? savedImage : item))
      : [savedImage, ...gallery];
    setGallery(updatedGallery);
    saveStoredItems(galleryStorageKey, updatedGallery);
    setGalleryForm(blankGallery);
    setEditingGalleryId("");
    setGalleryImageFile(null);
    setStatus(editingGalleryId ? "Gallery image updated." : "Gallery image added.");
  }

  function editGallery(item) {
    setTab("gallery");
    setEditingGalleryId(getItemId(item));
    setGalleryForm({
      title: item.title || "",
      category: item.category || "Laboratory",
      image: item.image || ""
    });
    setGalleryImageFile(null);
    setStatus("Editing selected gallery image.");
  }

  async function removeGallery(id) {
    try {
      await api.delete(`/gallery/${id}`);
    } catch {
      // Keep local delete working even when the backend is unavailable.
    }
    const updatedGallery = gallery.filter((item) => getItemId(item) !== id);
    setGallery(updatedGallery);
    saveStoredItems(galleryStorageKey, updatedGallery);
    setStatus("Gallery image deleted.");
  }

  function saveContact(event) {
    event.preventDefault();
    const cleanContact = {
      address: contactForm.address.trim() || defaultContact.address,
      email: contactForm.email.trim() || defaultContact.email,
      phone: contactForm.phone.trim() || defaultContact.phone,
      hours: contactForm.hours.trim() || defaultContact.hours
    };
    setContactForm(cleanContact);
    saveStoredObject(contactStorageKey, cleanContact);
    setStatus("Contact information updated.");
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex items-center gap-3 text-brand-navy dark:text-white">
          <LayoutDashboard className="text-brand-blue" />
          <h1 className="text-xl font-extrabold">Allivin Admin</h1>
        </div>
        <div className="mt-10 grid gap-2">
          {[
            ["products", "Product Management"],
            ["gallery", "Gallery Management"],
            ["contact", "Contact Management"]
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`rounded-lg px-4 py-3 text-left text-sm font-bold transition ${tab === id ? "bg-brand-blue text-white" : "text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800"}`}>{label}</button>
          ))}
        </div>
        <button onClick={logout} className="absolute bottom-6 left-6 right-6 btn-secondary"><LogOut size={18} /> Logout</button>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Dashboard</p>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">Content Management</h2>
            </div>
            <div className="flex gap-2 lg:hidden">
              {["products", "gallery", "contact"].map((id) => (
                <button key={id} onClick={() => setTab(id)} className={`rounded-lg px-3 py-2 text-sm font-bold ${tab === id ? "bg-brand-blue text-white" : "bg-slate-100 dark:bg-slate-800"}`}>{id}</button>
              ))}
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {status && <p className="mb-5 rounded-lg bg-blue-50 px-4 py-3 text-sm font-bold text-brand-blue dark:bg-blue-950">{status}</p>}

          {tab === "products" && (
            <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
              <Panel title={editingProductId ? "Edit Product" : "Add Product"}>
                <form onSubmit={saveProduct} className="grid gap-4">
                  <Field label="Product Name">
                    <input className="input" placeholder="Product name" value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} required />
                  </Field>
                  <Field label="Category">
                    <select className="input" value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}>
                      {["Tablets", "Capsules", "Syrups", "Injections"].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                  <Field label="Image URL">
                    <input className="input" placeholder="Image URL" value={productForm.image} onChange={(event) => setProductForm({ ...productForm, image: event.target.value })} />
                  </Field>
                  <Field label="Upload Product Image">
                    <input className="input" type="file" accept="image/*" onChange={(event) => setProductImageFile(event.target.files?.[0] || null)} />
                  </Field>
                  <Field label="Description">
                    <textarea className="input min-h-28" placeholder="Description" value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} required />
                  </Field>
                  <Field label="Uses">
                    <textarea className="input min-h-24" placeholder="Uses" value={productForm.uses} onChange={(event) => setProductForm({ ...productForm, uses: event.target.value })} />
                  </Field>
                  <Field label="Applications">
                    <textarea className="input min-h-24" placeholder="Applications" value={productForm.applications} onChange={(event) => setProductForm({ ...productForm, applications: event.target.value })} />
                  </Field>
                  <Field label="Quality">
                    <textarea className="input min-h-24" placeholder="Quality" value={productForm.quality} onChange={(event) => setProductForm({ ...productForm, quality: event.target.value })} />
                  </Field>
                  <Field label="Contact Phone Number">
                    <input className="input" placeholder="Contact phone number" value={productForm.contactPhone} onChange={(event) => setProductForm({ ...productForm, contactPhone: event.target.value })} />
                  </Field>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-primary"><Plus size={18} /> {editingProductId ? "Save Product" : "Add Product"}</button>
                    {editingProductId && <button type="button" className="btn-secondary" onClick={() => { setEditingProductId(""); setProductForm(blankProduct); setProductImageFile(null); }}>Cancel</button>}
                  </div>
                </form>
              </Panel>
              <Panel title="Existing Products">
                <div className="grid gap-4 md:grid-cols-2">
                  {products.map((product) => (
                    <AdminCard key={getItemId(product)} image={product.image} title={product.name} subtitle={product.category} text={product.description} onEdit={() => editProduct(product)} onDelete={() => removeProduct(getItemId(product))} />
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {tab === "gallery" && (
            <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
              <Panel title={editingGalleryId ? "Edit Gallery Image" : "Add Gallery Image"}>
                <form onSubmit={saveGallery} className="grid gap-4">
                  <Field label="Image Title">
                    <input className="input" placeholder="Image title" value={galleryForm.title} onChange={(event) => setGalleryForm({ ...galleryForm, title: event.target.value })} required />
                  </Field>
                  <Field label="Gallery Category">
                    <select className="input" value={galleryForm.category} onChange={(event) => setGalleryForm({ ...galleryForm, category: event.target.value })}>
                      {galleryCategories.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                  <Field label="Image URL">
                    <input className="input" placeholder="Image URL" value={galleryForm.image} onChange={(event) => setGalleryForm({ ...galleryForm, image: event.target.value })} />
                  </Field>
                  <Field label="Upload Gallery Image">
                    <input className="input" type="file" accept="image/*" onChange={(event) => setGalleryImageFile(event.target.files?.[0] || null)} />
                  </Field>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-primary"><ImagePlus size={18} /> {editingGalleryId ? "Save Gallery Image" : "Add Image"}</button>
                    {editingGalleryId && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setEditingGalleryId("");
                          setGalleryForm(blankGallery);
                          setGalleryImageFile(null);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </Panel>
              <Panel title="Gallery Images">
                <div className="grid gap-4 md:grid-cols-3">
                  {gallery.map((item) => (
                    <AdminCard key={getItemId(item)} image={item.image} title={item.title} subtitle={item.category} onEdit={() => editGallery(item)} onDelete={() => removeGallery(getItemId(item))} />
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {tab === "contact" && (
            <div className="grid gap-6 xl:grid-cols-[520px_1fr]">
              <Panel title="Edit Contact Us">
                <form onSubmit={saveContact} className="grid gap-4">
                  <Field label="Our Location">
                    <textarea className="input min-h-32" placeholder="Company address" value={contactForm.address} onChange={(event) => setContactForm({ ...contactForm, address: event.target.value })} required />
                  </Field>
                  <Field label="Email Us">
                    <input className="input" type="email" placeholder="Email address" value={contactForm.email} onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })} required />
                  </Field>
                  <Field label="Call Us">
                    <input className="input" placeholder="Phone number" value={contactForm.phone} onChange={(event) => setContactForm({ ...contactForm, phone: event.target.value })} required />
                  </Field>
                  <Field label="Working Hours">
                    <textarea className="input min-h-24" placeholder="Working hours" value={contactForm.hours} onChange={(event) => setContactForm({ ...contactForm, hours: event.target.value })} required />
                  </Field>
                  <button className="btn-primary"><Save size={18} /> Save Contact Details</button>
                </form>
              </Panel>

              <Panel title="Current Contact Preview">
                <div className="grid gap-4">
                  <PreviewRow label="Our Location" value={contactForm.address} />
                  <PreviewRow label="Email Us" value={contactForm.email} />
                  <PreviewRow label="Call Us" value={contactForm.phone} />
                  <PreviewRow label="Working Hours" value={contactForm.hours} />
                </div>
              </Panel>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-5 text-lg font-extrabold text-brand-navy dark:text-white">{title}</h3>
      {children}
    </section>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  );
}

function AdminCard({ image, title, subtitle, text, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      {image && <img src={image} alt={title} onError={(event) => { event.currentTarget.style.display = "none"; }} className="h-40 w-full object-cover" />}
      <div className="p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">{subtitle}</p>
        <h4 className="mt-2 font-bold text-brand-navy dark:text-white">{title}</h4>
        {text && <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{text}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {onEdit && <button onClick={onEdit} className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-brand-blue transition hover:bg-blue-100 dark:bg-blue-950"><Save size={16} /> Edit</button>}
          {onDelete && <button onClick={onDelete} className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 dark:bg-red-950 dark:text-red-200"><Trash2 size={16} /> Delete</button>}
        </div>
      </div>
    </div>
  );
}
