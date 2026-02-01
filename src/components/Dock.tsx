import { useState, useRef } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface DockItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
  isOpen: boolean;
  isPersistent: boolean;
}

interface DockProps {
  items: DockItem[];
  onItemClick: (id: string) => void;
  isDark: boolean;
}

export function Dock({ items, onItemClick, isDark }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  // More realistic macOS-like scaling - subtle and smooth
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5; // Center item
    if (distance === 1) return 1.25; // Adjacent items
    if (distance === 2) return 1.1; // Next adjacent
    return 1;
  };

  // Y-axis movement for bounce effect
  const getY = (index: number) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return -12;
    if (distance === 1) return -6;
    if (distance === 2) return -2;
    return 0;
  };

  // Calculate horizontal offset to prevent overlap
  const getX = (index: number) => {
    if (hoveredIndex === null) return 0;

    let offset = 0;
    const direction = index > hoveredIndex ? 1 : -1;
    const distance = Math.abs(index - hoveredIndex);

    if (distance === 0) return 0;

    // Push items away from hovered item
    if (distance === 1) offset = 12 * direction;
    if (distance === 2) offset = 6 * direction;

    return offset;
  };

  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Circle;
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        delay: 0.8,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
      className="fixed bottom-4 inset-x-0 mx-auto w-fit z-[999]"
    >
      <div
        ref={dockRef}
        className={`flex items-end justify-center gap-1 px-3 pb-2 pt-3 rounded-2xl ${
          isDark ? "bg-[#1e1e1e]/70" : "bg-white/70"
        }`}
        style={{
          backdropFilter: "blur(25px) saturate(180%)",
          WebkitBackdropFilter: "blur(25px) saturate(180%)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          boxShadow: isDark
            ? "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05) inset"
            : "0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.5) inset",
        }}
      >
        {items.map((item, index) => {
          const Icon = getIconComponent(item.icon);
          const scale = getScale(index);
          const y = getY(index);
          const x = getX(index);

          return (
            <motion.div
              key={item.id}
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                scale,
                y,
                x,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Tooltip - centered above icon */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none ${
                  isDark ? "bg-[#2a2a2a] text-white" : "bg-white text-gray-900"
                }`}
                style={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {item.name}
              </div>

              {/* Icon Button */}
              <button
                onClick={() => onItemClick(item.id)}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
                // style={{
                //   background: item.color || (isDark ? "#2a2a2a" : "#e5e5e5"),
                // }}
              >
                <img
                  src={`/Icons/${item.icon}.png`}
                  alt=""
                  className="w-12 h-12 text-white"
                />
                {/* >                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} /> */}
              </button>

              {/* Open Indicator Dot */}
              {item.isOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(0,0,0,0.4)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
