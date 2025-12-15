import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api/axios";
import ImageGallery from "../components/ui/ImageGallery";
import Button from "../components/ui/Button";
import PropertyCard from "../components/property/PropertyCard";
import SkeletonPropertyDetails from "../components/ui/SkeletonPropertyDetails";
import PropertyEnquiry from "../components/property/PropertyEnquiry";

export default function PropertyDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PROPERTY ---------------- */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/properties/${slug}`);
        const prop = res.data.property || res.data;
        setProperty(prop);

        const rel = await api.get(`/properties/related/advanced/${slug}`);
        setRelated(rel.data.related || []);
      } catch (err) {
        console.error(err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slug]);

  if (loading) return <SkeletonPropertyDetails />;
  if (!property)
    return <div className="py-24 text-center text-gray-500">Property not found</div>;

  const locationText = [
    property.location?.address,
    property.location?.city,
    property.location?.state,
    property.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* BACK */}
      <Button variant="ghost" onClick={() => navigate(-1)}>
        ← Back to listings
      </Button>

      {/* MAIN */}
      <div className="mt-6 grid lg:grid-cols-2 gap-12">
        {/* IMAGES */}
        <ImageGallery images={property.images || []} />

        {/* INFO */}
        <div>
          {/* TITLE */}
          <h1 className="text-3xl font-semibold leading-tight text-primary">
            {property.title}
          </h1>

          {/* PRICE */}
          <p className="mt-2 text-2xl font-bold text-primary">
  AED {Number(property.price).toLocaleString("en-IN")}
  {property.listingType === "rent" && (
    <span className="ml-2 text-base font-medium text-gray-500">
      per month
    </span>
  )}
</p>


          {/* LOCATION */}
          <p className="mt-1 text-sm text-secondary">
            {locationText || "Location not available"}
          </p>

          {/* META */}
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-secondary">
            <span>{property.bedrooms ?? 0} Beds</span>
            <span>{property.bathrooms ?? 0} Baths</span>
            {property.area && <span>{property.area} sq ft</span>}
          </div>

          {/* TAGS */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs capitalize">
              {property.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
              {property.furnished ? "Furnished" : "Unfurnished"}
            </span>
          </div>

          {/* DESCRIPTION */}
          {property.description && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-secondary">
                {property.description}
              </p>
            </div>
          )}

          <PropertyEnquiry property={property} />
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Similar Properties
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
