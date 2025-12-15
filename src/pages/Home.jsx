import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api/axios";
import PropertyCard from "../components/property/PropertyCard";
import toast from "react-hot-toast";

export default function Home() {
  const location = useLocation();

  /* ---------------- CONTACT FORM ---------------- */
  const [form, setForm] = useState({
    name: "",
    contact: "",
    message: "",
    method: "call",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/contact", form);
      setForm({ name: "", contact: "", message: "", method: "call" });
      toast.success("Message sent successfully");
    } catch {
      toast.error("Failed to send message");
    }
  };

  /* ---------------- FETCH PROPERTIES ---------------- */
  const { data = [], isLoading } = useQuery({
    queryKey: ["home-properties"],
    queryFn: async () => {
      const res = await api.get("/api/properties");
      return res.data?.properties || [];
    },
  });

  const featured = data.find((p) => p.isFeatured) || null;
  const topPicks = data.filter((p) => p.isTopPick).slice(0, 3);

  /* ---------------- AUTO SCROLL CONTACT ---------------- */
  useEffect(() => {
    if (location.hash === "#contact-us") {
      setTimeout(() => {
        document.getElementById("contact-us")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);
    }
  }, [location]);

  return (
    <div className="w-full bg-base text-primary">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[85vh] flex items-center">
        <img
          src="/images/dubai.jpg"
          alt="Luxury residences"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
            Homes, thoughtfully curated.
          </h1>

          <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
            A refined selection of residences chosen for design, location,
            and long-term value.
          </p>

          <Link
            to="/listings"
            className="inline-block text-primary border-b border-primary pb-1 text-lg font-medium hover:opacity-70 transition"
          >
            Explore available properties →
          </Link>
        </div>
      </section>

      {/* ================= EDITORIAL INTRO ================= */}
      <section className="py-32 bg-base">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-3xl md:text-4xl font-bold leading-relaxed">
            We believe a great home is not just found —
            <span className="italic text-secondary"> it is recognised.</span>
          </p>
        </div>
      </section>

      {/* ================= FEATURED PROPERTY ================= */}
      <section className="py-32 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Featured Property
            </h2>
            <p className="text-secondary max-w-xl">
              A standout residence selected for its architecture,
              setting, and lifestyle value.
            </p>
          </div>

          {isLoading || !featured ? (
            <p className="text-secondary">Loading featured property…</p>
          ) : (
            <div className="max-w-md">
              <PropertyCard property={featured} />
            </div>
          )}
        </div>
      </section>

      {/* ================= TOP PICKS ================= */}
      <section className="py-32 bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Top Picks
            </h2>
            <p className="text-secondary max-w-xl">
              A curated set of properties offering exceptional quality and appeal.
            </p>
          </div>

          {isLoading ? (
            <p className="text-secondary">Loading properties…</p>
          ) : topPicks.length === 0 ? (
            <p className="text-secondary">No properties available right now.</p>
          ) : (
            <div className="grid gap-12 md:grid-cols-3">
              {topPicks.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTACT (UNCHANGED) ================= */}
      <section id="contact-us" className="bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary text-center mb-4">
            Get in Touch
          </h2>

          <p className="text-center text-secondary mb-12">
            Questions, site visits, or guidance — our team will respond promptly.
          </p>

          <div className="bg-white border border-secondary/20 rounded-2xl p-8 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="Email or Phone"
                  className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  required
                />
              </div>

              <textarea
                placeholder="How can we help you?"
                className="p-3 border rounded-lg w-full h-32 outline-none focus:ring-2 focus:ring-primary/30"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />

              <div className="flex gap-6 text-sm text-secondary">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="call"
                    checked={form.method === "call"}
                    onChange={(e) =>
                      setForm({ ...form, method: e.target.value })
                    }
                  />
                  Call me
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="message"
                    checked={form.method === "message"}
                    onChange={(e) =>
                      setForm({ ...form, method: e.target.value })
                    }
                  />
                  Message me
                </label>
              </div>

              <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= INSIGHTS ================= */}
      <section className="py-32 bg-base border-t border-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-16">
            News & Market Insights
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Dubai Real Estate Market Outlook",
                url: "https://www.propertyfinder.ae/blog/",
              },
              {
                title: "Buying vs Renting in the UAE",
                url: "https://www.bayut.com/mybayut/",
              },
              {
                title: "Investment Trends in Property",
                url: "https://www.thenationalnews.com/business/property/",
              },
            ].map((n, i) => (
              <a
                key={i}
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <h4 className="text-xl font-medium mb-2 group-hover:underline">
                  {n.title}
                </h4>
                <span className="text-secondary text-sm">
                  Read article →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
