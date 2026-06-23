import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-extrabold">Allivin Laboratories</h3>
          <p className="mt-4 text-sm leading-6 text-blue-100">Trusted pharmaceutical manufacturing partner for tablets, capsules, syrups, injections, and custom formulation support.</p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Twitter, Facebook].map((Icon, index) => (
              <a key={index} href="#" aria-label="Social media" className="rounded-lg bg-white/10 p-2 transition hover:bg-brand-teal">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold">Quick Links</h4>
          <div className="mt-4 grid gap-2 text-sm text-blue-100">
            {["About Us", "Products", "Quality Assurance", "Gallery", "Contact Us"].map((label) => (
              <a href={`/#${label.toLowerCase().replaceAll(" ", "-")}`} key={label} className="transition hover:text-white">{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold">Product Categories</h4>
          <div className="mt-4 grid gap-2 text-sm text-blue-100">
            {["Tablets", "Capsules", "Syrups", "Injections", "Custom Formulations"].map((label) => (
              <a href="/#products" key={label} className="transition hover:text-white">{label}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold">Contact</h4>
          <div className="mt-4 grid gap-3 text-sm text-blue-100">
            <span className="flex gap-2"><MapPin size={18} /> Industrial Pharma Park, Hyderabad, India</span>
            <span className="flex gap-2"><Mail size={18} /> info@allivinlabs.com</span>
            <span className="flex gap-2"><Phone size={18} /> +91 98765 43210</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-blue-100">
        Copyright © {new Date().getFullYear()} Allivin Laboratories. All rights reserved.
      </div>
    </footer>
  );
}
