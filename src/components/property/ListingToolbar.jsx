import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, SortAsc, SortDesc } from "lucide-react";

export default function ListingToolbar({ filters, setFilters }) {
  const [openSort, setOpenSort] = useState(false);

  const handleSort = (type) => {
    setFilters(prev => ({ ...prev, sort: type }));
    setOpenSort(false);
  };

  const quickToggle = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => quickToggle("furnished")}
            className={`px-4 py-1.5 rounded-full border text-sm transition
              ${filters.furnished ? "bg-black text-white" : "bg-white hover:bg-gray-100"}
            `}
          >
            Furnished
          </button>

          <button
            onClick={() => quickToggle("parking")}
            className={`px-4 py-1.5 rounded-full border text-sm transition
              ${filters.parking ? "bg-black text-white" : "bg-white hover:bg-gray-100"}
            `}
          >
            Parking
          </button>

          <button
            onClick={() => quickToggle("familyOnly")}
            className={`px-4 py-1.5 rounded-full border text-sm transition
              ${filters.familyOnly ? "bg-black text-white" : "bg-white hover:bg-gray-100"}
            `}
          >
            Family Only
          </button>
        </div>

        {/* Right section — Sort button */}
        <div className="relative">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="flex items-center gap-2 px-4 py-1.5 border rounded-full text-sm hover:bg-gray-100"
          >
            <SlidersHorizontal size={16} />
            Sort
          </button>

          {openSort && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.12 }}
              className="absolute right-0 mt-2 bg-white shadow-lg border rounded-xl w-40 overflow-hidden"
            >
              <button
                onClick={() => handleSort("newest")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Newest
              </button>

              <button
                onClick={() => handleSort("lowToHigh")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                <SortAsc size={15} />
                Price: Low → High
              </button>

              <button
                onClick={() => handleSort("highToLow")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                <SortDesc size={15} />
                Price: High → Low
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
