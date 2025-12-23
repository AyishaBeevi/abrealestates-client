export default function ImageGallerySmall({ images }) {
  if (!images || images.length === 0) return null;

  const src = images[0].url.replace(
    "/upload/",
    "/upload/f_webp,q_55,w_480,c_fill/"
  );

  return (
    <img
      src={src}
      alt="Property image"
      width="480"
      height="320"
      loading="lazy"
      className="w-full h-48 object-cover rounded-lg"
    />
  );
}
