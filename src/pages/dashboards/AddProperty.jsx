import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api/axios";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ImageReorderPreview from "../../components/property/ImageReorderPreview";
import toast from "react-hot-toast";

export default function AddPropertyForm() {
  const queryClient = useQueryClient();

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    listingType: "rent",
    price: "",
    bedrooms: 1,
    bathrooms: 1,
    area: "",
    address: "",
    city: "",
    state: "",
    country: "",
    type: "apartment",
    furnished: false,
  });

  /* ---------------- handlers ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  /* ---------------- mutation ---------------- */
  const createProperty = useMutation({
    mutationFn: async () => {
      const form = new FormData();

      Object.entries(formData).forEach(([key, val]) =>
        form.append(key, String(val))
      );

      if (images.length === 0) throw new Error("Upload at least one image");

      images.forEach((img) => form.append("images", img.file));

      return api.post("/api/properties", form);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["agent-properties"]);
      toast.success("Property submitted for admin approval");

      setFormData({
        title: "",
        description: "",
        listingType: "rent",
        price: "",
        bedrooms: 1,
        bathrooms: 1,
        area: "",
        address: "",
        city: "",
        state: "",
        country: "",
        type: "apartment",
        furnished: false,
      });

      setImages([]);
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add property");
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProperty.mutate();
        }}
        className="space-y-4"
      >
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />


<div className="flex gap-4">
  <button
    type="button"
    onClick={() => setFormData((p) => ({ ...p, listingType: "rent" }))}
    className={`flex-1 py-2 rounded-lg border ${
      formData.listingType === "rent"
        ? "bg-blue-600 text-white"
        : "bg-white"
    }`}
  >
    Rent
  </button>

  <button
    type="button"
    onClick={() => setFormData((p) => ({ ...p, listingType: "sale" }))}
    className={`flex-1 py-2 rounded-lg border ${
      formData.listingType === "sale"
        ? "bg-blue-600 text-white"
        : "bg-white"
    }`}
  >
    Sale
  </button>
</div>

        <Input
  name="price"
  type="number"
  placeholder={
    formData.listingType === "rent"
      ? "Price (AED / month)"
      : "Price (AED total)"
  }
  value={formData.price}
  onChange={handleChange}
/>


        <div className="grid grid-cols-2 gap-4">
          <Input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
          <Input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
        </div>

        <Input name="area" type="number" placeholder="Area (sqft)" value={formData.area} onChange={handleChange} />

        <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

        <div className="grid grid-cols-3 gap-4">
          <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <Input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        </div>

        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="plot">Plot</option>
          <option value="commercial">Commercial</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleChange} />
          Furnished
        </label>

        {/* Images */}
        <div>
          <label className="font-medium">Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImages} className="block mt-2" />

          {images.length > 0 && (
            <div className="mt-4">
              <ImageReorderPreview images={images} setImages={setImages} />
            </div>
          )}
        </div>

        <Button type="submit" disabled={createProperty.isLoading}>
          {createProperty.isLoading ? "Submitting…" : "Submit Property"}
        </Button>
      </form>
    </div>
  );
}
