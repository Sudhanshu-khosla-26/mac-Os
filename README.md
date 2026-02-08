# 🖥️ macOS Portfolio OS

> An interactive macOS-inspired portfolio that runs like a real operating system in your browser.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://www.sudhanshukhosla.in/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)

![Screenshot](/public/Screenshot.png)

## 🚀 Features

- **🪟 Full Window Management** - Drag, resize, minimize, and maximize windows
- **🎨 macOS UI** - Menu bar, Dock with magnification, Spotlight search, Launchpad
- **📱 Fully Responsive** - Adapts from desktop OS to mobile fullscreen apps
- **🌓 Theme Support** - Light/dark mode with glassmorphism effects
- **⚡ Smooth Animations** - Powered by Framer Motion

## 🛠️ Built With

- **React** + **TypeScript** - Component architecture
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vite** - Build tool

## 📦 Quick Start

```bash
git clone https://github.com/Sudhanshu-khosla-26/macos-portfolio.git
cd macos-portfolio
npm install
npm run dev
```

## 📱 Apps Included

About Me • Projects • Skills • Experience • Resume • Gallery • Terminal • Camera • Spotify • YouTube

## 🏗️ Architecture

```
src/
├── components/
│   ├── apps/          # Individual app components
│   ├── Dock.tsx       # Bottom dock
│   ├── Window.tsx     # Window wrapper
│   ├── MenuBar.tsx    # Top menu
│   └── Desktop.tsx    # Main desktop
├── hooks/
│   ├── useWindowManager.ts
│   ├── useTheme.ts
│   └── useSpotlight.ts
└── App.tsx
```

## 💡 How It Works

Each app runs in a managed window with:

- Position & size state
- Z-index stacking
- Minimize/maximize logic
- Mobile auto-fullscreen

The `useWindowManager` hook controls all window operations globally.

## 🎯 Roadmap

- [ ] File system simulation
- [ ] Terminal commands
- [ ] Drag & drop files
- [ ] State persistence

## 👨‍💻 Author

**Sudhanshu Khosla**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Sudhanshu-khosla-26)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/sudhanshu-khosla-a05b4a298)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:work.sudhanshukhosla@gmail.com)

## 📄 License

MIT © Sudhanshu Khosla

---

⭐ **Star this repo** if you found it interesting!
