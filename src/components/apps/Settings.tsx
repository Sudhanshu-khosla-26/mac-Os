import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Moon,
  Sun,
  Laptop,
  Volume2,
  Bell,
  Wifi,
  Bluetooth,
  Battery,
  User,
  Shield,
  Keyboard,
  Menu,
  X,
} from "lucide-react";

interface SettingsProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

interface SettingSection {
  id: string;
  title: string;
  icon: string;
  settings: {
    id: string;
    label: string;
    type: "toggle" | "select" | "button";
    value?: boolean;
    options?: string[];
  }[];
}

const SETTING_SECTIONS: SettingSection[] = [
  {
    id: "appearance",
    title: "Appearance",
    icon: "Monitor",
    settings: [
      {
        id: "theme",
        label: "Theme",
        type: "select",
        options: ["Dark", "Light", "Auto"],
      },
      {
        id: "transparency",
        label: "Transparency Effects",
        type: "toggle",
        value: true,
      },
      {
        id: "animations",
        label: "Reduce Animations",
        type: "toggle",
        value: false,
      },
    ],
  },
  {
    id: "sound",
    title: "Sound",
    icon: "Volume2",
    settings: [
      {
        id: "soundEffects",
        label: "Sound Effects",
        type: "toggle",
        value: true,
      },
      {
        id: "notifications",
        label: "Notification Sounds",
        type: "toggle",
        value: true,
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: "Bell",
    settings: [
      {
        id: "showPreviews",
        label: "Show Previews",
        type: "toggle",
        value: true,
      },
      { id: "badges", label: "App Badges", type: "toggle", value: true },
    ],
  },
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Monitor,
    Moon,
    Sun,
    Laptop,
    Volume2,
    Bell,
    Wifi,
    Bluetooth,
    Battery,
    User,
    Shield,
    Keyboard,
  };
  return icons[iconName] || Monitor;
};

export function Settings({ isDark, onToggleTheme }: SettingsProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("appearance");
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div
      className={`w-full h-full flex relative overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
    >
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isMobile ? (sidebarOpen ? 0 : "-100%") : 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          w-64 flex-shrink-0 border-r h-full z-50
          fixed inset-y-0 left-0        /* Mobile */
          md:relative md:translate-x-0   /* Desktop */
          ${isDark ? "border-white/10 bg-[#1e1e1e]" : "border-black/10 bg-white"}
        `}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Settings
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-lg md:hidden ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-black/10 text-gray-900"}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {SETTING_SECTIONS.map((section) => {
              const Icon = getIconComponent(section.icon);
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? isDark
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : isDark
                        ? "text-white/60 hover:bg-white/5"
                        : "text-gray-600 hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Navbar */}
        <div
          className={`flex items-center gap-3 p-4 border-b md:hidden ${isDark ? "border-white/10 bg-[#0a0a0a]" : "border-black/10 bg-white"}`}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-black/10 text-gray-900"}`}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2
            className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Settings
          </h2>
        </div>

        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl mb-8 flex items-center gap-5 shadow-sm ${isDark ? "bg-[#1e1e1e]" : "bg-white border border-black/5"}`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}
            >
              SK
            </div>
            <div>
              <h3
                className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Sudhanshu khosla
              </h3>
              <p
                className={`text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}
              >
                work.sudhanshukhosla@gmail.com
              </p>
            </div>
          </motion.div>

          {/* Dynamic Sections */}
          {SETTING_SECTIONS.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`mb-8 rounded-2xl overflow-hidden shadow-sm ${isDark ? "bg-[#1e1e1e]" : "bg-white border border-black/5"}`}
            >
              <div
                className={`px-6 py-4 border-b ${isDark ? "border-white/10" : "border-black/5"}`}
              >
                <h3
                  className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {section.title}
                </h3>
              </div>
              <div className="p-2">
                {section.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between px-4 py-4 rounded-xl"
                  >
                    <span
                      className={`font-medium ${isDark ? "text-white/80" : "text-gray-700"}`}
                    >
                      {setting.label}
                    </span>

                    {setting.type === "toggle" && (
                      <button
                        className={`w-11 h-6 rounded-full transition-all relative ${setting.value ? "bg-green-500" : isDark ? "bg-white/20" : "bg-gray-300"}`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${setting.value ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    )}

                    {setting.type === "select" && (
                      <select
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium outline-none ${isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-900"}`}
                      >
                        {setting.options?.map((opt) => (
                          <option key={opt} value={opt.toLowerCase()}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Keyboard Shortcuts Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl overflow-hidden shadow-sm ${isDark ? "bg-[#1e1e1e]" : "bg-white border border-black/5"}`}
          >
            <div
              className={`px-6 py-4 border-b ${isDark ? "border-white/10" : "border-black/5"}`}
            >
              <h3
                className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Keyboard Shortcuts
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {[
                { key: "⌘ + Space", action: "Open Spotlight" },
                { key: "⌘ + ⇧ + T", action: "Toggle Theme" },
                { key: "⌘ + W", action: "Close Window" },
              ].map((shortcut) => (
                <div
                  key={shortcut.key}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}
                >
                  <span
                    className={`text-sm font-medium ${isDark ? "text-white/60" : "text-gray-600"}`}
                  >
                    {shortcut.action}
                  </span>
                  <kbd
                    className={`px-2 py-1 rounded-md text-xs font-mono border ${isDark ? "bg-white/10 text-white border-white/10" : "bg-white text-gray-700 border-gray-200 shadow-sm"}`}
                  >
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
