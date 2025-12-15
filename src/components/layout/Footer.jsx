import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4 tracking-wide">
            AB REAL ESTATE
          </h2>
          <p className="text-secondary">
            Your trusted real estate partner for premium residential and
            commercial properties.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-secondary leading-relaxed">
            123 AB Street <br />
            Dubai, UAE
          </p>
          <p className="mt-3 text-secondary">
            +971 50 123 4567 <br />
            abrealestatesdb@gmail.com
          </p>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Business Hours</h4>
          <p className="text-secondary">Mon – Fri: 9:00 – 18:00</p>
          <p className="text-secondary">Saturday: 9:00 – 13:00</p>
          <p className="text-secondary">Sunday: By Appointment</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-secondary transition"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-secondary transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/10 hover:bg-secondary transition"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-secondary">
          © {new Date().getFullYear()} AB Real Estate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
