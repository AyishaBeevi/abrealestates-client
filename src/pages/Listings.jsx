import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import PropertyFilters from "../components/property/PropertyFilters";
import SkeletonCard from "../components/ui/SkeletonCard";
import PropertyCard from "../components/property/PropertyCard";
import { useToast } from "../context/ToastContext";
import api from "../services/api/axios";
export default function Listings() {
  const toast = useToast()?.addToast || (() => {});

  /* ---------------- STATE ---------------- */
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [listingType, setListingType] = useState("rent");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ---------------- REFS ---------------- */
  const loaderRef = useRef(null);
  const mobileFilterOpen = useRef(false);
  const [, forceRender] = useState(0);

  /* ---------------- HELPERS ---------------- */
  const cleanParams = (obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(
        ([, v]) => v !== "" && v !== null && v !== undefined
      )
    );

  /* ---------------- FETCH ---------------- */
  const fetchProperties = useCallback(
    async (reset = false) => {
      if (loading) return;

      try {
        setLoading(true);

        const params = cleanParams({
          ...filters,            // 🔒 filters only
          listingType,           // 🔑 always from state
          sort,
          page: reset ? 1 : page,
          limit: 12,
        });

        const res = await api.get("/api/properties", { params });


        const data = res.data.properties || [];

        setProperties((prev) =>
          reset ? data : [...prev, ...data]
        );

        setHasMore((reset ? 1 : page) < res.data.totalPages);
      } catch (err) {
        toast("Failed to load properties", "error");
      } finally {
        setLoading(false);
      }
    },
    [filters, sort, listingType, page, loading]
  );

  /* ---------------- FILTER / SORT CHANGE ---------------- */
  useEffect(() => {
    setProperties([]);
    setPage(1);
    setHasMore(true);
    fetchProperties(true);
  }, [filters, sort, listingType]);

  /* ---------------- PAGE CHANGE ---------------- */
  useEffect(() => {
    if (page !== 1) fetchProperties();
  }, [page]);

  /* ---------------- INFINITE SCROLL ---------------- */
  useEffect(() => {
    if (!loaderRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  /* ---------------- FILTER HANDLER ---------------- */
  const handleFilterChange = useCallback((newFilters) => {
    const { listingType, ...safeFilters } = newFilters; // 🚫 NEVER accept this
    setFilters(safeFilters);
    mobileFilterOpen.current = false;
    forceRender((n) => n + 1);
  }, []);

  /* ---------------- MOBILE DRAWER ---------------- */
  const openDrawer = () => {
    mobileFilterOpen.current = true;
    forceRender((n) => n + 1);
  };

  const closeDrawer = () => {
    mobileFilterOpen.current = false;
    forceRender((n) => n + 1);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Property Listings
      </h1>

      {/* MOBILE FILTER BUTTON */}
      <button
        className="lg:hidden fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg z-50"
        onClick={openDrawer}
      >
        Filters
      </button>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen.current && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeDrawer}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white p-5 rounded-t-2xl shadow-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button onClick={closeDrawer}>✕</button>
            </div>

            <PropertyFilters
              isMobile
              onFilter={(f) => {
                handleFilterChange(f);
                closeDrawer();
              }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-80 sticky top-20">
          <PropertyFilters onFilter={handleFilterChange} />
        </aside>

        {/* CONTENT */}
        <div className="flex-1">
          {/* BUY / RENT + SORT */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {["rent", "sale"].map((type) => (
                <button
                  key={type}
                  onClick={() => setListingType(type)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                    listingType === type
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {type === "rent" ? "Rent" : "Buy"}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="lowprice">Price: Low → High</option>
              <option value="highprice">Price: High → Low</option>
            </select>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && properties.length === 0
              ? [...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : properties.map((p) => (
                  <PropertyCard key={p._id} property={p} />
                ))}
          </div>

          {/* EMPTY STATE */}
          {!loading && properties.length === 0 && (
            <div className="py-24 text-center text-gray-500">
              <p className="text-lg font-medium">
                No {listingType === "rent" ? "rental" : "sale"} properties found
              </p>
              <p className="text-sm mt-1">
                Try adjusting filters or switch to{" "}
                {listingType === "rent" ? "Buy" : "Rent"} listings
              </p>
            </div>
          )}

          {/* INFINITE LOADER */}
          <div ref={loaderRef} className="mt-8 text-center">
            {loading && properties.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!hasMore && properties.length > 0 && (
              <p className="text-gray-500 mt-6">
                No more properties
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
