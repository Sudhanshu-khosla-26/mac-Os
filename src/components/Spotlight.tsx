import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { SpotlightResult } from "@/types";

interface SpotlightProps {
  isOpen: boolean;
  query: string;
  setQuery: (query: string) => void;
  results: SpotlightResult[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onClose: () => void;
  isDark: boolean;
}

export function Spotlight({
  isOpen,
  query,
  setQuery,
  results,
  selectedIndex,
  setSelectedIndex,
  onClose,
  isDark,
}: SpotlightProps) {
  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Circle;
  };

  const handleResultClick = (result: SpotlightResult) => {
    result.action();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/30"
            onClick={onClose}
          />

          {/* Spotlight Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/4 inset-x-0 mx-auto z-[2001] w-[600px] max-w-[90vw]"
          >
            <div
              className={`rounded-xl overflow-hidden ${
                isDark ? "bg-[#1e1e1e]/95" : "bg-white/95"
              }`}
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Search Input */}
              <div
                className={`p-4 border-b ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LucideIcons.Search
                    className={`w-5 h-5 ${
                      isDark ? "text-white/50" : "text-black/50"
                    }`}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Spotlight Search"
                    className={`flex-1 bg-transparent outline-none text-lg ${
                      isDark
                        ? "text-white placeholder:text-white/40"
                        : "text-gray-900 placeholder:text-black/40"
                    }`}
                    autoFocus
                  />
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      isDark
                        ? "bg-white/10 text-white/60"
                        : "bg-black/10 text-black/60"
                    }`}
                  >
                    ⌘ Space
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-auto">
                {results.length === 0 ? (
                  <div
                    className={`p-8 text-center ${
                      isDark ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    No results found
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((result, index) => {
                      const Icon = getIconComponent(result.icon);
                      const isSelected = index === selectedIndex;

                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            isSelected
                              ? "bg-[#007aff] text-white"
                              : isDark
                                ? "hover:bg-white/10 text-white"
                                : "hover:bg-black/10 text-gray-900"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? "bg-white/20" : "bg-[#007aff]/10"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-medium">{result.name}</div>
                            <div
                              className={`text-sm ${
                                isSelected ? "text-white/70" : "text-gray-500"
                              }`}
                            >
                              {result.type === "app"
                                ? "Application"
                                : "Command"}
                            </div>
                          </div>
                          {isSelected && (
                            <LucideIcons.ArrowRight className="w-4 h-4" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className={`px-4 py-2 text-xs flex items-center justify-between ${
                  isDark
                    ? "bg-white/5 text-white/40"
                    : "bg-black/5 text-black/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span>↑↓ to navigate</span>
                  <span>↵ to open</span>
                  <span>esc to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
