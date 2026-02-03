import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  isDark: boolean;
}

interface Command {
  input: string;
  output: string[];
  isTyping?: boolean;
}

interface FileSystem {
  [key: string]: {
    type: "file" | "directory";
    content?: string;
    children?: string[];
  };
}

// Virtual file system
const FILE_SYSTEM: FileSystem = {
  "~": {
    type: "directory",
    children: [
      "about.txt",
      "projects",
      "skills",
      "experience",
      "contact",
      "resume.pdf",
      "README.md",
    ],
  },
  "~/about.txt": {
    type: "file",
    content: `Name: Sudhanshu Khosla
Role: Full Stack Developer
Location: India
Education: B.Tech in Computer Science

Passionate developer with experience in building
scalable web applications and innovative solutions.`,
  },
  "~/README.md": {
    type: "file",
    content: `# Welcome to Sudhanshu's Portfolio

This is an interactive macOS-style portfolio.

## Quick Commands
- about       - Learn about me
- projects    - View my projects
- skills      - See my technical skills
- experience  - View work experience
- contact     - Get in touch
- resume      - Download my resume

## System Commands
- ls          - List files
- cat [file]  - View file contents
- cd [dir]    - Change directory
- pwd         - Print working directory
- clear       - Clear terminal
- help        - Show all commands
`,
  },
  "~/projects": {
    type: "directory",
    children: ["DeployHub", "FinTrack", "AI-Support-Bot", "Portfolio"],
  },
  "~/projects/DeployHub": {
    type: "file",
    content: `DeployHub - One-Click Deployment Platform
Tech: React, Node.js, Docker, AWS
Status: Production Ready
GitHub: github.com/sudhanshu-khosla/DeployHub`,
  },
  "~/projects/FinTrack": {
    type: "file",
    content: `FinTrack - Personal Finance Tracker
Tech: Next.js, TypeScript, PostgreSQL, Prisma
Status: Completed
GitHub: github.com/sudhanshu-khosla/FinTrack`,
  },
  "~/projects/AI-Support-Bot": {
    type: "file",
    content: `AI Support Bot - Intelligent Customer Support
Tech: Python, OpenAI, FastAPI, React
Status: MVP Complete
GitHub: github.com/sudhanshu-khosla/AI-Support-Bot`,
  },
  "~/projects/Portfolio": {
    type: "file",
    content: `Portfolio - This macOS Web Experience
Tech: React, TypeScript, Tailwind, Framer Motion
Status: Always Improving
GitHub: github.com/sudhanshu-khosla/portfolio`,
  },
  "~/skills": {
    type: "directory",
    children: [
      "languages.txt",
      "frontend.txt",
      "backend.txt",
      "databases.txt",
      "tools.txt",
    ],
  },
  "~/skills/languages.txt": {
    type: "file",
    content: "JavaScript, TypeScript, Python, Go, SQL",
  },
  "~/skills/frontend.txt": {
    type: "file",
    content: "React, Next.js, Vue.js, Tailwind CSS, Framer Motion",
  },
  "~/skills/backend.txt": {
    type: "file",
    content: "Node.js, Express, FastAPI, GraphQL, REST APIs",
  },
  "~/skills/databases.txt": {
    type: "file",
    content: "PostgreSQL, MongoDB, Redis, MySQL",
  },
  "~/skills/tools.txt": {
    type: "file",
    content: "Docker, AWS, Git, CI/CD, Kubernetes, Linux",
  },
  "~/experience": {
    type: "directory",
    children: ["Nitya_Consulting.txt", "Freelance.txt"],
  },
  "~/experience/Nitya_Consulting.txt": {
    type: "file",
    content: `Full Stack Developer Intern
Nitya Consulting | Jan 2025 - Present

- Built and deployed full-stack applications
- Worked with React, Node.js, and cloud services
- Collaborated with cross-functional teams`,
  },
  "~/experience/Freelance.txt": {
    type: "file",
    content: `Freelance Developer
Self-Employed | 2023 - Present

- Developed custom web solutions for clients
- Managed end-to-end project delivery
- Built strong client relationships`,
  },
  "~/contact": { type: "directory", children: ["email.txt", "social.txt"] },
  "~/contact/email.txt": {
    type: "file",
    content: "sudhanshu.khosla@gmail.com",
  },
  "~/contact/social.txt": {
    type: "file",
    content: "GitHub: @sudhanshu-khosla\nLinkedIn: /in/sudhanshu-khosla",
  },
  "~/resume.pdf": { type: "file", content: "[Binary PDF File]" },
};

const WELCOME_MESSAGE = [
  "Welcome to Sudhanshu's Portfolio Terminal",
  'Type "help" to see available commands',
  "",
];

const COLOR_CODES: Record<string, string> = {
  "30": "color: #000000;", // Black
  "31": "color: #ff5f56;", // Red
  "32": "color: #27c93f;", // Green
  "33": "color: #ffbd2e;", // Yellow
  "34": "color: #007aff;", // Blue
  "35": "color: #af52de;", // Magenta
  "36": "color: #5ac8fa;", // Cyan
  "37": "color: #ffffff;", // White
  "90": "color: #8e8e93;", // Bright Black (Gray)
  "1": "font-weight: bold;",
};

// Parse ANSI color codes for display
const parseAnsi = (text: string): { text: string; styles: string } => {
  const ansiRegex = /\x1b\[(\d+)m/g;
  let result = text;
  let styles = "";
  let match;

  while ((match = ansiRegex.exec(text)) !== null) {
    const code = match[1];
    if (COLOR_CODES[code]) {
      styles += COLOR_CODES[code];
    }
    result = result.replace(match[0], "");
  }

  return { text: result, styles };
};

export function Terminal({ isDark }: TerminalProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState("~");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [promptColor, setPromptColor] = useState("#34c759");

  useEffect(() => {
    setCommands([{ input: "", output: WELCOME_MESSAGE, isTyping: false }]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const getPath = (input: string): string => {
    if (input.startsWith("~/")) return input;
    if (input.startsWith("/")) return input.slice(1);
    if (input === "~") return "~";
    return currentDir === "~" ? `~/${input}` : `${currentDir}/${input}`;
  };

  const executeCommand = (input: string): string[] => {
    const parts = input.trim().split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        return [
          "╔═══════════════════════════════════════════════════╗     ",
          "║              AVAILABLE COMMANDS                   ║     ",
          "╠═══════════════════════════════════════════════════╣     ",
          "\x1b[36m│ Navigation:                                       │\x1b[0m",
          "\x1b[90m│   ls, dir       - List directory contents         │\x1b[0m",
          "\x1b[90m│   cd [dir]      - Change directory                │\x1b[0m",
          "\x1b[90m│   pwd           - Print working directory         │\x1b[0m",
          "\x1b[90m│   cat [file]    - Display file contents           │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[36m│ Portfolio:                                        │\x1b[0m",
          "\x1b[90m│   about         - Learn about me                  │\x1b[0m",
          "\x1b[90m│   projects      - View my projects                │\x1b[0m",
          "\x1b[90m│   skills        - See my technical skills         │\x1b[0m",
          "\x1b[90m│   experience    - View work experience            │\x1b[0m",
          "\x1b[90m│   contact       - Get in touch                    │\x1b[0m",
          "\x1b[90m│   resume        - Download resume                 │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[36m│ System:                                           │\x1b[0m",
          "\x1b[90m│   clear         - Clear terminal                  │\x1b[0m",
          "\x1b[90m│   whoami        - Display user info               │\x1b[0m",
          "\x1b[90m│   date          - Show current date/time          │\x1b[0m",
          "\x1b[90m│   color [hex]   - Change prompt color             │\x1b[0m",
          "╚═══════════════════════════════════════════════════╝",
          "",
        ];

      case "ls":
      case "dir":
        const path = getPath(args[0] || ".");
        const item = FILE_SYSTEM[path];
        if (!item)
          return [
            `\x1b[31mls: cannot access '${args[0] || "."}': No such file or directory\x1b[0m`,
            "",
          ];
        if (item.type === "file") return [path];
        const children = item.children || [];
        return children.map((child) => {
          const childPath = path === "~" ? `~/${child}` : `${path}/${child}`;
          const childItem = FILE_SYSTEM[childPath];
          if (childItem?.type === "directory")
            return `\x1b[34m${child}/\x1b[0m`;
          if (child.endsWith(".txt") || child.endsWith(".md"))
            return `\x1b[32m${child}\x1b[0m`;
          return child;
        });

      case "cd":
        const targetDir = args[0] || "~";
        const targetPath = getPath(targetDir);
        const targetItem = FILE_SYSTEM[targetPath];
        if (!targetItem)
          return [
            `\x1b[31mcd: no such file or directory: ${targetDir}\x1b[0m`,
            "",
          ];
        if (targetItem.type !== "directory")
          return [`\x1b[31mcd: not a directory: ${targetDir}\x1b[0m`, ""];
        setCurrentDir(targetPath);
        return [];

      case "pwd":
        return [`/home/sudhanshu/${currentDir}`];

      case "cat":
        if (!args[0]) return ["\x1b[31mcat: missing file operand\x1b[0m", ""];
        const filePath = getPath(args[0]);
        const fileItem = FILE_SYSTEM[filePath];
        if (!fileItem)
          return [
            `\x1b[31mcat: ${args[0]}: No such file or directory\x1b[0m`,
            "",
          ];
        if (fileItem.type === "directory")
          return [`\x1b[31mcat: ${args[0]}: Is a directory\x1b[0m`, ""];
        return fileItem.content?.split("\n") || [""];

      case "about":
        return executeCommand("cat ~/about.txt");

      case "projects":
        return [
          "╔═══════════════════════════════════════════════════╗",
          "║                    MY PROJECTS                    ║",
          "╠═══════════════════════════════════════════════════╣",
          "\x1b[33m│ 1. DeployHub                                      │\x1b[0m",
          "\x1b[90m│    One-Click Deployment Platform                  │\x1b[0m",
          "\x1b[90m│    React, Node.js, Docker, AWS                    │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ 2. FinTrack                                       │\x1b[0m",
          "\x1b[90m│    Personal Finance Tracker                       │\x1b[0m",
          "\x1b[90m│    Next.js, TypeScript, PostgreSQL, Prisma        │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ 3. AI Support Bot                                 │\x1b[0m",
          "\x1b[90m│    Intelligent Customer Support                   │\x1b[0m",
          "\x1b[90m│    Python, OpenAI, FastAPI, React                 │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ 4. Portfolio (This!)                              │\x1b[0m",
          "\x1b[90m│    macOS Web Experience                           │\x1b[0m",
          "\x1b[90m│    React, TypeScript, Tailwind, Framer Motion     │\x1b[0m",
          "╚═══════════════════════════════════════════════════╝",
          "",
          '\x1b[90mType "cat ~/projects/[ProjectName]" for details\x1b[0m',
          "",
        ];

      case "skills":
        return [
          "╔═══════════════════════════════════════════════════╗",
          "║                 TECHNICAL SKILLS                  ║",
          "╠═══════════════════════════════════════════════════╣",
          "\x1b[33m│ Languages:                                        │\x1b[0m",
          "\x1b[90m│   JavaScript, TypeScript, Python, Go, SQL         │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ Frontend:                                         │\x1b[0m",
          "\x1b[90m│   React, Next.js, Vue.js, Tailwind CSS            │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ Backend:                                          │\x1b[0m",
          "\x1b[90m│   Node.js, Express, FastAPI, GraphQL              │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ Databases:                                        │\x1b[0m",
          "\x1b[90m│   PostgreSQL, MongoDB, Redis, MySQL               │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ Tools & DevOps:                                   │\x1b[0m",
          "\x1b[90m│   Docker, AWS, Git, CI/CD, Kubernetes, Linux      │\x1b[0m",
          "╚═══════════════════════════════════════════════════╝",
          "",
        ];

      case "experience":
        return [
          "╔═══════════════════════════════════════════════════╗",
          "║                  WORK EXPERIENCE                  ║",
          "╠═══════════════════════════════════════════════════╣",
          "\x1b[33m│ Full Stack Developer Intern                       │\x1b[0m",
          "\x1b[90m│ Nitya Consulting | Jan 2025 - Present             │\x1b[0m",
          "\x1b[90m│ • Built and deployed full-stack applications      │\x1b[0m",
          "\x1b[90m│ • Worked with React, Node.js, cloud services      │\x1b[0m",
          "\x1b[90m│ • Collaborated with cross-functional teams        │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[33m│ Freelance Developer                               │\x1b[0m",
          "\x1b[90m│ Self-Employed | 2023 - Present                    │\x1b[0m",
          "\x1b[90m│ • Developed custom web solutions for clients      │\x1b[0m",
          "\x1b[90m│ • Managed end-to-end project delivery             │\x1b[0m",
          "\x1b[90m│ • Built strong client relationships               │\x1b[0m",
          "╚═══════════════════════════════════════════════════╝",
          "",
        ];

      case "contact":
        return [
          "╔═══════════════════════════════════════════════════╗",
          "║                  GET IN TOUCH                     ║",
          "╠═══════════════════════════════════════════════════╣",
          "\x1b[36m│                                                   │\x1b[0m",
          "\x1b[90m│ Email:    sudhanshu.khosla@gmail.com              │\x1b[0m",
          "\x1b[90m│ GitHub:   github.com/sudhanshu-khosla             │\x1b[0m",
          "\x1b[90m│ LinkedIn: linkedin.com/in/sudhanshu-khosla        │\x1b[0m",
          "\x1b[36m│                                                   │\x1b[0m",
          "╚═══════════════════════════════════════════════════╝",
          "",
        ];

      case "resume":
        // Trigger download
        const link = document.createElement("a");
        link.href = "/SUDHANSHU-KHOSLA-RESUME.pdf";
        link.download = "Sudhanshu_Khosla_Resume.pdf";
        link.click();
        return [
          "\x1b[32m✓ Resume download started!\x1b[0m",
          "\x1b[90mFile: Sudhanshu_Khosla_Resume.pdf\x1b[0m",
          "",
        ];

      case "whoami":
        return ["sudhanshu", "Full Stack Developer", "India", ""];

      case "date":
        return [new Date().toString(), ""];

      case "clear":
        return ["__CLEAR__"];

      case "color":
        if (!args[0])
          return [
            "\x1b[31mUsage: color [hex-code]\x1b[0m",
            "Example: color #ff5733",
            "",
          ];
        const color = args[0];
        if (!/^#[0-9A-Fa-f]{6}$/.test(color))
          return [
            "\x1b[31mInvalid hex color code\x1b[0m",
            "Example: color #ff5733",
            "",
          ];
        setPromptColor(color);
        return [`\x1b[32mPrompt color changed to ${color}\x1b[0m`, ""];

      case "open":
        if (!args[0]) return ["\x1b[31mUsage: open [app_name]\x1b[0m", ""];
        const appName = args[0].toLowerCase();
        const appMap: Record<string, string> = {
          finder: "finder",
          terminal: "terminal",
          projects: "projects",
          about: "about",
          contact: "contact",
          settings: "settings",
          spotify: "spotify",
          journal: "journal",
          camera: "camera",
        };
        if (appMap[appName]) {
          window.dispatchEvent(
            new CustomEvent("openApp", { detail: appMap[appName] }),
          );
          return [`\x1b[32mOpening ${appName}...\x1b[0m`, ""];
        }
        return [`\x1b[31mUnknown app: ${appName}\x1b[0m`, ""];

      case "":
        return [];

      default:
        return [
          `\x1b[31mCommand not found: ${cmd}\x1b[0m`,
          '\x1b[90mType "help" for available commands\x1b[0m',
          "",
        ];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const output = executeCommand(currentInput);

    if (output[0] === "__CLEAR__") {
      setCommands([]);
    } else {
      setCommands((prev) => [
        ...prev,
        { input: currentInput, output, isTyping: false },
      ]);
    }

    setHistory((prev) => [...prev, currentInput]);
    setHistoryIndex(-1);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  // Listen for openApp events
  useEffect(() => {
    const handleOpenApp = () => {
      // App open events are handled by the window manager
    };
    window.addEventListener("openApp", handleOpenApp as EventListener);
    return () =>
      window.removeEventListener("openApp", handleOpenApp as EventListener);
  }, []);

  return (
    <div
      ref={terminalRef}
      className={`w-full h-full p-4 font-mono text-sm overflow-auto ${
        isDark ? "bg-[#0c0c0c]" : "bg-white"
      }`}
      onClick={() => inputRef.current?.focus()}
      style={{ lineHeight: "1.6" }}
    >
      {/* Terminal Content */}
      <div className="space-y-0.5">
        {commands.map((cmd, cmdIndex) => (
          <div key={cmdIndex}>
            {/* Input Line */}
            {cmd.input && (
              <div
                className={`flex items-center gap-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                <span style={{ color: promptColor }}>➜</span>
                <span className="text-[#5ac8fa]">{currentDir}</span>
                <span>{cmd.input}</span>
              </div>
            )}

            {/* Output Lines */}
            <div>
              {cmd.output.map((line, lineIndex) => {
                const { text, styles } = parseAnsi(line);
                return (
                  <div
                    key={lineIndex}
                    className="whitespace-pre"
                    style={
                      styles
                        ? {
                            ...Object.fromEntries(
                              styles
                                .split(";")
                                .filter((s) => s)
                                .map((s) =>
                                  s
                                    .split(":")
                                    .map((v, i) =>
                                      i === 0 ? v.trim() : v.trim(),
                                    ),
                                ),
                            ),
                          }
                        : {}
                    }
                  >
                    {text || "\u00A0"}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span style={{ color: promptColor }}>➜</span>
          <span className="text-[#5ac8fa]">{currentDir}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            spellCheck={false}
            autoComplete="off"
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.53,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={`w-2 h-5 ${isDark ? "bg-white" : "bg-gray-900"}`}
          />
        </form>
      </div>
    </div>
  );
}
