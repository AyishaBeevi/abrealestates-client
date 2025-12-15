import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ImageGallerySmall from "../ui/ImageGallerySmall.jsx";

export default function PropertyCard({ property }) {
  const navigate = useNavigate();

  /* ---------------- Location text ---------------- */
  const locationText = [
    property.location?.address,
    property.location?.city,
    property.location?.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <motion.article
      onClick={() => navigate(`/properties/${property.slug}`)}
      className="
        bg-base rounded-2xl overflow-hidden
        border border-secondary/20
        shadow-sm hover:shadow-md
        cursor-pointer transition-shadow
        focus:outline-none focus:ring-2 focus:ring-primary/40
      "
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* ---------------- IMAGE ---------------- */}
      <div className="relative">
        <ImageGallerySmall images={property.images} />

        {/* PRICE */}
        <span
  className="
    absolute left-3 top-3
    bg-white/90 backdrop-blur
    px-3 py-1 rounded-full
    text-sm font-semibold text-primary
  "
>
  AED {Number(property.price).toLocaleString("en-IN")}
  {property.listingType === "rent" && (
    <span className="text-xs font-medium text-gray-600"> / month</span>
  )}
</span>


        {/* FEATURED (highlight, not status) */}
        {property.isFeatured && (
          <span className="
            absolute right-3 top-3
            bg-indigo-600 text-white
            text-xs font-medium
            px-3 py-1 rounded-full
          ">
            Featured
          </span>
        )}

        {/* STATUS */}
        {property.status && property.status !== "available" && (
          <span
            className={`absolute left-3 bottom-3
              text-xs font-medium px-3 py-1 rounded-full text-white
              ${
                property.status === "sold"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }
            `}
          >
            {property.status.toUpperCase()}
          </span>
        )}
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-snug line-clamp-2 text-primary">
          {property.title}
        </h3>

        <p className="mt-0.5 text-sm text-secondary line-clamp-1">
          {locationText || "Location not available"}
        </p>

        <div className="mt-3 flex gap-4 text-xs text-secondary">
          <span>{property.bedrooms ?? 0} bd</span>
          <span className="capitalize">{property.type}</span>
          <span>{property.furnished ? "Furnished" : "Unfurnished"}</span>
        </div>
      </div>
    </motion.article>
  );
}
