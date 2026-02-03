import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface GalleryProps {
  isDark: boolean;
}

const SIDEBAR_ITEMS = [
  { id: "library", name: "Library", icon: "/icons/gicon1.svg" },
  { id: "memories", name: "Memories", icon: "/icons/gicon2.svg" },
  { id: "places", name: "Places", icon: "/icons/file.svg" },
  { id: "people", name: "People", icon: "/icons/gicon4.svg" },
  { id: "favorites", name: "Favorites", icon: "/icons/gicon5.svg" },
];

// Using Unsplash random images
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    alt: "Gallery image 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80",
    alt: "Gallery image 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&q=80",
    alt: "Gallery image 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=800&q=80",
    alt: "Gallery image 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=800&q=80",
    alt: "Gallery image 5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=800&q=80",
    alt: "Gallery image 6",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1682687221248-3116ba6ab483?w=800&q=80",
    alt: "Gallery image 7",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1682687219356-e820ca126c92?w=800&q=80",
    alt: "Gallery image 8",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=800&q=80",
    alt: "Gallery image 9",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1682687218212-8c1cb10d1e5d?w=800&q=80",
    alt: "Gallery image 10",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=800&q=80",
    alt: "Gallery image 11",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&q=80",
    alt: "Gallery image 12",
  },
];

export function Gallery({ isDark }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState("library");
  const [selectedPhoto, setSelectedPhoto] = useState<
    (typeof GALLERY_IMAGES)[0] | null
  >(null);

  return (
    <>
      <style>{`
        .photos-sidebar li {
          transition: all 0.2s ease;
        }

        .photos-sidebar li:hover {
          transform: translateX(4px);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
          padding: 20px;
        }

        .gallery-item {
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"};
        }

        .gallery-item:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-popup-overlay {
          backdrop-filter: blur(20px);
        }

        .photo-popup-image {
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <div className="flex h-full w-full">
        {/* Sidebar */}
        <div
          className={`photos-sidebar w-48 border-r ${
            isDark
              ? "border-white/10 bg-[#1e1e1e]/95"
              : "border-black/10 bg-gray-50/95"
          }`}
        >
          <div className="p-4">
            <h2
              className={`text-2xl font-semibold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Photos
            </h2>
            <ul className="space-y-1">
              {SIDEBAR_ITEMS.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setSelectedItem(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selectedItem === item.id
                        ? isDark
                          ? "bg-white/10 text-white"
                          : "bg-black/10 text-gray-900"
                        : isDark
                          ? "hover:bg-white/5 text-white/70"
                          : "hover:bg-black/5 text-gray-600"
                    }`}
                  >
                    <img src={item.icon} alt={item.name} className="w-5 h-5" />
                    <p className="text-sm font-medium">{item.name}</p>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className={`flex-1 overflow-auto ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}
        >
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="gallery-item"
                onClick={() => setSelectedPhoto(image)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Popup Viewer */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="photo-popup-overlay fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              background: isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.8)",
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className={`absolute top-6 right-6 p-3 rounded-full transition-all z-[10000] ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-black/10 hover:bg-black/20 text-white"
              }`}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="photo-popup-image"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 text-white text-sm"
            >
              {selectedPhoto.alt}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
