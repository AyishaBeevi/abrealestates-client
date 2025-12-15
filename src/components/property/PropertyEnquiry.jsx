import { useState } from "react";
import api from "../../services/api/axios";
import toast from "react-hot-toast";

export default function PropertyEnquiry({ property }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    message: `I’m interested in ${property.title}. Please contact me.`,
    preferredContact: "call",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      await api.post("/api/enquiries", {
        ...form,
        propertyId: property._id,
      });
      setSent(true);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-10">
        <h3 className="text-lg font-semibold text-green-700">
          Enquiry sent successfully
        </h3>
        <p className="text-sm text-green-600 mt-1">
          Our team will contact you shortly regarding this property.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-secondary/20 rounded-2xl p-8 mt-12">
      <h3 className="text-2xl font-semibold text-primary mb-2">
        Enquire about this property
      </h3>

      <p className="text-sm text-secondary mb-6">
        Share your details and we’ll connect you with the right agent.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your name"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Email or phone"
            className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />
        </div>

        <textarea
          className="p-3 border rounded-lg w-full h-28 outline-none focus:ring-2 focus:ring-primary/30"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <div className="flex gap-6 text-sm text-secondary">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="call"
              checked={form.preferredContact === "call"}
              onChange={(e) =>
                setForm({ ...form, preferredContact: e.target.value })
              }
            />
            Call me
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="message"
              checked={form.preferredContact === "message"}
              onChange={(e) =>
                setForm({ ...form, preferredContact: e.target.value })
              }
            />
            Message me
          </label>
        </div>

        <button
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
}
