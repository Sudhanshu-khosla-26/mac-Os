🖥️ macOS Portfolio OS

A fully interactive macOS-inspired portfolio website built with React, TypeScript, and Framer Motion.
It simulates a real desktop environment where users can open apps, manage windows, and explore my work like a real operating system.

Designed to showcase projects, skills, and experience through an immersive UI instead of a traditional portfolio.

✨ Features
🪟 Window Manager

Draggable & resizable windows

Minimize / maximize / close

Focus & z-index stacking

Mobile: auto-fullscreen apps

🧭 macOS-style Interface

Menu bar with system actions

Dock with hover magnification

Launchpad & Spotlight search

Desktop icons

📱 Responsive OS

Desktop → full macOS simulation

Mobile → fullscreen app mode

Smart dock behavior

Touch-friendly UI

🧑‍💻 Apps inside the OS

About Me

Projects

Skills

Experience

Resume

Gallery

Terminal

Camera

Spotify

YouTube

🌙 Theming

Light / dark mode

Glassmorphism UI

Smooth transitions

🛠️ Tech Stack

Frontend

React

TypeScript

Tailwind CSS

Framer Motion

Architecture

Custom Window Manager

Global event system

Responsive OS layout

Tooling

Vite

ESLint

Prettier

📦 Installation
git clone https://github.com/yourusername/macos-portfolio.git
cd macos-portfolio
npm install
npm run dev

Build:

npm run build
npm run preview

🧠 How it Works
Window System

Each app runs inside a managed window state:

position

size

z-index

minimized / maximized

A global window manager hook controls all windows.

Dock Logic

Desktop: persistent dock

Mobile: overlay dock

Hover magnification

Active app indicators

Menu Bar

Desktop: full macOS menu

Mobile: simplified status bar

📁 Project Structure
src/
├─ components/
│ ├─ apps/
│ ├─ Dock.tsx
│ ├─ Window.tsx
│ ├─ MenuBar.tsx
│ └─ Desktop.tsx
│
├─ hooks/
│ ├─ useWindowManager.ts
│ ├─ useTheme.ts
│ └─ useSpotlight.ts
│
├─ App.tsx
└─ main.tsx

🎯 Purpose

This project was built to:

Showcase full-stack skills

Demonstrate UI engineering depth

Create a memorable portfolio experience

Push React beyond typical dashboards

🚀 Future Improvements

iOS control center

File system simulation

Terminal commands

Drag-drop files

Real app persistence

Multiplayer desktop

👨‍💻 Author

Sudhanshu Khosla
Full Stack Developer

GitHub: https://github.com/Sudhanshu-khosla-26

LinkedIn: https://linkedin.com/in/sudhanshu-khosla-a05b4a298

Email: work.sudhanshukhosla@gmail.com

⭐ If you like this project
