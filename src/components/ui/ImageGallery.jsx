import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ images = [] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const openAt = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* ---------- THUMBNAILS (3:4 RATIO) ---------- */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => openAt(i)}
            className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group bg-gray-100"
          >
            <img
              src={img.url}
              alt={`property-${i}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}
      </div>

      {/* ---------- FULLSCREEN (NO CROPPING) ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.img
              src={images[index].url}
              alt="preview"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl
                         bg-black/40 hover:bg-black/60
                         rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>

            {/* COUNTER */}
            <div className="absolute bottom-6 text-sm text-white/80">
              {index + 1} / {images.length}
            </div>

            {/* ARROWS */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-6 text-white text-3xl
                             bg-black/40 hover:bg-black/60
                             rounded-full w-12 h-12 flex items-center justify-center"
                >
                  ‹
                </button>

                <button
                  onClick={next}
                  className="absolute right-6 text-white text-3xl
                             bg-black/40 hover:bg-black/60
                             rounded-full w-12 h-12 flex items-center justify-center"
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
