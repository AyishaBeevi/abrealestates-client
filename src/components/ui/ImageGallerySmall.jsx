export default function ImageGallerySmall({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <img
      src={images[0].url}
      alt="cover"
      className="w-full h-48 object-cover rounded-lg"
      loading="lazy"
    />
  );
}