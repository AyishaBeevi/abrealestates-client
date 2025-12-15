import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api/axios";
import ImageGallerySmall from "../../../components/ui/ImageGallerySmall";

export default function AgentPropertyCard({ property, onEdit }) {
  const queryClient = useQueryClient();

  const deleteProperty = useMutation({
    mutationFn: async () => api.delete(`/api/properties/${property._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["agent-properties"]);
      alert("Property deleted");
    }
  });

  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition relative">

      {/* Image Gallery */}
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <ImageGallerySmall images={property.images} />
      </div>

      <h3 className="text-lg font-semibold mt-3">{property.title}</h3>
      <p className="text-sm text-gray-600">{property.city}</p>

      <p className="font-bold text-gray-900 mt-1">
        AED {Number(property.price).toLocaleString("en-IN")}
      </p>

      {/* Status (approval) + availability */}
      <div className="flex flex-wrap gap-2 mt-2">

        {/* Admin Approval State */}
       {/* APPROVAL STATUS */}
<span
  className={`px-2 py-1 text-xs rounded ${
    property.isApproved
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {property.isApproved ? "APPROVED" : "PENDING"}
</span>

{/* AVAILABILITY */}
<span
  className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
>
  {property.status?.toUpperCase() || "AVAILABLE"}
</span>


       

        {property.isFeatured && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
            FEATURED
          </span>
        )}

        {property.isTopPick && (
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
            TOP PICK
          </span>
        )}
      </div>


<select
  value={property.status}
  onChange={async (e) => {
    const newStatus = e.target.value;
    await api.patch(`/api/properties/${property._id}/availability`, {
      status: newStatus,
    });
    queryClient.invalidateQueries(["agent-properties"]);
  }}
  className="mt-3 p-2 border rounded text-sm"
>
  <option value="available">Available</option>
  <option value="sold">Sold</option>
  <option value="rented">Rented</option>
</select>


      {/* Actions */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (confirm("Delete this property?")) deleteProperty.mutate();
          }}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
