import React from 'react';
import { motion } from 'framer-motion';
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
  Keyboard
} from 'lucide-react';

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
    type: 'toggle' | 'select' | 'button';
    value?: boolean;
    options?: string[];
  }[];
}

const SETTING_SECTIONS: SettingSection[] = [
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'Monitor',
    settings: [
      { id: 'theme', label: 'Theme', type: 'select', options: ['Dark', 'Light', 'Auto'] },
      { id: 'transparency', label: 'Transparency Effects', type: 'toggle', value: true },
      { id: 'animations', label: 'Reduce Animations', type: 'toggle', value: false },
    ],
  },
  {
    id: 'sound',
    title: 'Sound',
    icon: 'Volume2',
    settings: [
      { id: 'soundEffects', label: 'Sound Effects', type: 'toggle', value: true },
      { id: 'notifications', label: 'Notification Sounds', type: 'toggle', value: true },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'Bell',
    settings: [
      { id: 'showPreviews', label: 'Show Previews', type: 'toggle', value: true },
      { id: 'badges', label: 'App Badges', type: 'toggle', value: true },
    ],
  },
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Monitor, Moon, Sun, Laptop, Volume2, Bell, Wifi, Bluetooth, Battery, User, Shield, Keyboard,
  };
  return icons[iconName] || Monitor;
};

export function Settings({ isDark, onToggleTheme }: SettingsProps) {
  return (
    <div className={`w-full h-full flex ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`w-56 flex-shrink-0 border-r ${
        isDark ? 'border-white/10 bg-[#1e1e1e]' : 'border-black/10 bg-white'
      }`}>
        <div className="p-4">
          <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h2>
          <div className="space-y-1">
            {SETTING_SECTIONS.map((section) => {
              const Icon = getIconComponent(section.icon);
              return (
                <button
                  key={section.id}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    isDark 
                      ? 'bg-white/10 text-white' 
                      : 'bg-black/10 text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl mb-6 ${
            isDark ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${
              isDark ? 'bg-[#007aff]/20 text-[#007aff]' : 'bg-blue-100 text-blue-600'
            }`}>
              AC
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Alex Chen
              </h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                hello@alexchen.dev
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        {SETTING_SECTIONS.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className={`mb-6 rounded-xl overflow-hidden ${
              isDark ? 'bg-[#1e1e1e]' : 'bg-white'
            }`}
          >
            <div className={`px-6 py-3 border-b ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {section.title}
              </h3>
            </div>
            <div className="p-2">
              {section.settings.map((setting) => (
                <div
                  key={setting.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}
                >
                  <span className={isDark ? 'text-white/80' : 'text-gray-700'}>
                    {setting.label}
                  </span>
                  
                  {setting.type === 'toggle' && (
                    <button
                      onClick={setting.id === 'theme' ? onToggleTheme : undefined}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        setting.value 
                          ? 'bg-[#34c759]' 
                          : isDark ? 'bg-white/20' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}

                  {setting.type === 'select' && (
                    <select
                      onChange={setting.id === 'theme' ? () => onToggleTheme() : undefined}
                      className={`px-3 py-1.5 rounded-lg text-sm outline-none ${
                        isDark 
                          ? 'bg-white/10 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {setting.options?.map((option) => (
                        <option key={option} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Keyboard Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl overflow-hidden ${
            isDark ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}
        >
          <div className={`px-6 py-3 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Keyboard Shortcuts
            </h3>
          </div>
          <div className="p-4 space-y-2">
            {[
              { key: '⌘ + Space', action: 'Open Spotlight' },
              { key: '⌘ + ⇧ + T', action: 'Toggle Theme' },
              { key: '⌘ + W', action: 'Close Window' },
              { key: '⌘ + M', action: 'Minimize Window' },
              { key: '⌘ + 1-9', action: 'Open App' },
            ].map((shortcut) => (
              <div
                key={shortcut.key}
                className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                  isDark ? 'bg-white/5' : 'bg-gray-50'
                }`}
              >
                <span className={isDark ? 'text-white/70' : 'text-gray-600'}>
                  {shortcut.action}
                </span>
                <kbd className={`px-2 py-1 rounded text-sm font-mono ${
                  isDark 
                    ? 'bg-white/10 text-white/80' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-6 text-center text-sm ${
            isDark ? 'text-white/40' : 'text-gray-400'
          }`}
        >
          <p>macOS Portfolio v1.0.0</p>
          <p className="mt-1">© 2024 Alex Chen. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
