import React from "react";

export default function AdminPropertyModal({
  property,
  onClose,
  onApprove,
  onReject,
  onDelete,
  onFeature,
  onTopPick,
}) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50">
      
      <div className="bg-white w-full max-w-3xl mx-auto rounded-xl shadow-xl relative my-6 p-0">

        {/* ===== STICKY HEADER ===== */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center z-50">
          <h2 className="text-xl font-bold">{property.title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✖
          </button>
        </div>

        {/* ===== MOBILE IMAGE CAROUSEL ===== */}
        <div className="md:hidden overflow-x-auto flex gap-3 p-4">
          {property.images?.map((img) => (
            <img
              key={img.publicId}
              src={img.url}
              className="h-40 w-64 rounded-lg object-cover flex-shrink-0 border"
            />
          ))}
        </div>

        {/* ===== DESKTOP IMAGE GRID ===== */}
        <div className="hidden md:grid grid-cols-2 gap-3 p-6">
          {property.images?.map((img) => (
            <img
              key={img.publicId}
              src={img.url}
              className="h-40 w-full rounded-lg border object-cover"
            />
          ))}
        </div>

        {/* ===== PROPERTY DETAILS ===== */}
        <div className="px-6 pb-6 space-y-4 text-gray-700">

          {/* PRICE + BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Price:</strong> AED {property.price?.toLocaleString()}</p>
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
            <p><strong>Area:</strong> {property.area} sq.ft</p>
            <p><strong>Status:</strong> {property.status}</p>
          </div>

          {/* LOCATION */}
          <div>
            <strong>Location:</strong>
            <p className="mt-1">
              {property.location?.address} <br />
              {property.location?.city}, {property.location?.state}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <strong>Description:</strong>
            <p className="mt-1 whitespace-pre-line">{property.description}</p>
          </div>

          {/* AMENITIES */}
          <div>
            <strong>Amenities:</strong>
            <p>{property.amenities?.join(", ") || "None"}</p>
          </div>

          {/* FLAGS */}
          <div className="grid grid-cols-2 gap-4 pt-3 text-gray-800">
            <p><strong>Featured:</strong> {property.isFeatured ? "Yes" : "No"}</p>
            <p><strong>Top Pick:</strong> {property.isTopPick ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="px-6 pb-6">
          
          {/* Mobile = grid; Desktop = row */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">

            <button
              onClick={onApprove}
              className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded"
            >
              Approve
            </button>

            <button
              onClick={onReject}
              className="w-full md:w-auto px-4 py-2 bg-yellow-600 text-white rounded"
            >
              Reject
            </button>

            <button
              onClick={onDelete}
              className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>

            <button
              onClick={onFeature}
              className={`w-full md:w-auto px-4 py-2 rounded ${
                property.isFeatured ? "bg-gray-700 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {property.isFeatured ? "Unfeature" : "Make Featured"}
            </button>

            <button
              onClick={onTopPick}
              className={`w-full md:w-auto px-4 py-2 rounded ${
                property.isTopPick ? "bg-gray-700 text-white" : "bg-purple-600 text-white"
              }`}
            >
              {property.isTopPick ? "Remove Top Pick" : "Mark Top Pick"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
