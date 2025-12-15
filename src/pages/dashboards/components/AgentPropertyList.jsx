import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api/axios";
import AgentPropertyCard from "./AgentPropertyCard";
import { useAuth } from "../../../hooks/useAuth";

export default function AgentPropertyList({ onEdit }) {
  const [filters, setFilters] = useState({
    sort: "newest",
    approval: "all",
    availability: "all",
  });

  const { user } = useAuth();

const { data, isLoading, isError } = useQuery({
  queryKey: ["agent-properties", filters],
  queryFn: async () => {
    const params = new URLSearchParams();

    if (filters.sort) params.append("sort", filters.sort);
    if (filters.approval !== "all") params.append("approval", filters.approval);
    if (filters.availability !== "all")
      params.append("availability", filters.availability);

    const res = await api.get(`/api/properties/agent?${params.toString()}`);
    return res.data;
  },
  enabled: user?.role === "agent",
});

  if (isLoading) return <p className="text-gray-600">Loading your properties…</p>;
  if (isError) return <p className="text-red-600">Failed to load properties</p>;

  const properties = data || [];



  return (
    <div className="mt-10">

      <h2 className="text-2xl font-semibold mb-4">Your Listings</h2>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">

  {/* Sort */}
  <select
    className="border p-2 rounded"
    value={filters.sort}
    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
  >
    <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="lowprice">Price: Low → High</option>
    <option value="highprice">Price: High → Low</option>
  </select>

  {/* Approval */}
  <select
    className="border p-2 rounded"
    value={filters.approval}
    onChange={(e) => setFilters({ ...filters, approval: e.target.value })}
  >
    <option value="all">All</option>
    <option value="approved">Approved</option>
    <option value="pending">Pending</option>
  </select>

  {/* Availability */}
  <select
    className="border p-2 rounded"
    value={filters.availability}
    onChange={(e) =>
      setFilters({ ...filters, availability: e.target.value })
    }
  >
    <option value="all">All</option>
    <option value="available">Available</option>
    <option value="sold">Sold</option>
    <option value="rented">Rented</option>
  </select>

  {/* RESET BUTTON */}
  <button
    onClick={() =>
      setFilters({
        sort: "newest",
        approval: "all",
        availability: "all",
      })
    }
    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
  >
    Reset
  </button>

</div>


      {/* Property list */}
      {properties.length === 0 ? (
        <p className="text-gray-700">You haven't posted any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((p) => (
            <AgentPropertyCard
              key={p._id}
              property={p}
              onEdit={() => onEdit(p)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
