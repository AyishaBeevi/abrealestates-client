import React, { useState, useEffect } from "react";

export default function PropertyFilters({ onFilter, isMobile = false }) {
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    type: "",        // 🔥 FIX: backend expects "type"
  });

  const clean = (obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(
        ([_, v]) => v !== "" && v !== null && v !== undefined
      )
    );

  /* ---------------- DESKTOP SEARCH DEBOUNCE ---------------- */
  useEffect(() => {
    if (isMobile) return;

    const t = setTimeout(() => {
      onFilter(clean(filters));
    }, 300);

    return () => clearTimeout(t);
  }, [filters.search]);

  /* ---------------- UPDATE ---------------- */
  const update = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------------- APPLY (Mobile) ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(clean(filters));
  };

  /* ---------------- RESET ---------------- */
  const handleReset = (e) => {
    e.preventDefault();

    const empty = {
      search: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      type: "",
    };

    setFilters(empty);
    onFilter({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-3"
    >
      <h3 className="font-bold text-lg mb-1">Filters</h3>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Title search"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* PROPERTY TYPE */}
      <select
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Property Type</option>
        <option value="villa">Villa</option>
        <option value="apartment">Apartment</option>
        <option value="plot">Plot</option>
        <option value="commercial">Commercial</option>
      </select>

      {/* PRICE */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* BED/BATH */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Bathrooms"
          value={filters.bathrooms}
          onChange={(e) => update("bathrooms", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded flex-1"
        >
          Apply
        </button>

        <button
          type="button"   // 🔥 FIX: prevent triggering submit
          onClick={handleReset}
          className="bg-gray-300 text-black px-4 py-2 rounded flex-1"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
