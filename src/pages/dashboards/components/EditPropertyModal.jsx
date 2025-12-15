import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api/axios";
import AirbnbImageManager from "../../../components/property/AirbnbImageManager";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function EditPropertyModal({ property, onClose }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);

  /* ---------------- URL Normalizer (Safe) ---------------- */
  const normalizeUrl = (raw) => {
    if (!raw || typeof raw !== "string") return "";

    // Already correct
    if (raw.startsWith("http")) return raw;

    // Remove leading slash if any
    const clean = raw.replace(/^\//, "");

    const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    return `${base}/${clean}`;
  };

  /* ---------------- Prefill ---------------- */
  useEffect(() => {
    if (!property) return;

    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      address: property.address,
      city: property.city,
      state: property.state,
      country: property.country,
      type: property.type,
      furnished: property.furnished,
    });

    // normalize all images safely
    const normalizedImages =
      property.images
        ?.filter(Boolean)
        ?.map((img) => {
          // img can be string or object → sanitize
          const raw = typeof img === "string" ? img : img?.url || "";
          const full = normalizeUrl(raw);

          return {
            id: crypto.randomUUID(),
            url: full,
            file: null,
            preview: full,
          };
        }) || [];

    setImages(normalizedImages);
  }, [property]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewImages = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newFiles]);
  };

  /* ---------------- Submit update ---------------- */
  const updateProperty = useMutation({
    mutationFn: async () => {
      const form = new FormData();

      Object.entries(formData).forEach(([key, val]) =>
        form.append(key, String(val))
      );

      // send existing URLs in correct order
      const existing = images
        .filter((img) => img.url && !img.file)
        .map((img) => img.url);

      form.append("existingImages", JSON.stringify(existing));

      // append new files only
      images.forEach((img) => {
        if (img.file) {
          form.append("newImages", img.file);
        }
      });

      return api.put(`/api/properties/${property._id}`, form);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["agent-properties"]);
      alert("Property updated!");
      onClose();
    },
  });

  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start py-10 z-[1000] overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Edit Property</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProperty.mutate();
          }}
          className="space-y-4"
        >
          {/* Basic fields */}
          <Input name="title" value={formData.title} onChange={handleChange} />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="border p-2 rounded w-full"
          />

<div className="flex gap-4 mb-4">
  <button
    type="button"
    onClick={() =>
      setFormData((p) => ({ ...p, listingType: "rent" }))
    }
    className={`flex-1 py-2 rounded ${
      formData.listingType === "rent"
        ? "bg-blue-600 text-white"
        : "border"
    }`}
  >
    Rent
  </button>

  <button
    type="button"
    onClick={() =>
      setFormData((p) => ({ ...p, listingType: "sale" }))
    }
    className={`flex-1 py-2 rounded ${
      formData.listingType === "sale"
        ? "bg-blue-600 text-white"
        : "border"
    }`}
  >
    Sale
  </button>
</div>

          <Input name="price" type="number" value={formData.price} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            <Input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} />
            <Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} />
          </div>

          <Input name="area" type="number" value={formData.area} onChange={handleChange} />

          <Input
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Enter full address"
          />

          <div className="grid grid-cols-3 gap-4">
            <Input name="city" value={formData.city} onChange={handleChange} />
            <Input name="state" value={formData.state} onChange={handleChange} />
            <Input name="country" value={formData.country} onChange={handleChange} />
          </div>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="commercial">Commercial</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
            />
            Furnished
          </label>

          {/* ---------------- Airbnb Image Manager ---------------- */}
          <label className="block font-medium mt-4 mb-2">
            Images (drag to reorder)
          </label>

          <AirbnbImageManager images={images} setImages={setImages} />

          <input type="file" multiple accept="image/*" onChange={handleNewImages} className="mt-3" />

          <Button type="submit" disabled={updateProperty.isLoading}>
            {updateProperty.isLoading ? "Updating…" : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
