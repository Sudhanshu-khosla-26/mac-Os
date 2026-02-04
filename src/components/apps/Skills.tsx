import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Wrench,
  Palette,
  Terminal,
  Cpu,
  Menu,
} from "lucide-react";

interface SkillsProps {
  isDark: boolean;
}

interface Skill {
  name: string;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    icon: "Code2",
    color: "#007aff",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "SQL" },
      { name: "PHP" },
      { name: "C / C++" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & UI",
    icon: "Palette",
    color: "#af52de",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
      { name: "Redux Toolkit" },
    ],
  },
  {
    id: "backend",
    name: "Backend & Frameworks",
    icon: "Terminal",
    color: "#34c759",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Prisma" },
      { name: "WebSockets" },
      { name: "REST APIs" },
    ],
  },
  {
    id: "database",
    name: "Databases & Messaging",
    icon: "Database",
    color: "#ff9500",
    skills: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Apache Kafka" },
      { name: "ClickHouse" },
      { name: "Pinecone" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: "Cloud",
    color: "#5ac8fa",
    skills: [
      { name: "AWS (EC2, S3, ECS, ECR)" },
      { name: "Docker" },
      { name: "Nginx" },
      { name: "Firebase" },
      { name: "GitHub CI/CD" },
      { name: "Terraform" },
    ],
  },
  {
    id: "ai",
    name: "AI & Automation",
    icon: "Cpu",
    color: "#ff3b30",
    skills: [
      { name: "Vapi AI" },
      { name: "RAG" },
      { name: "n8n" },
      { name: "LLM API Integration" },
      { name: "Machine Learning" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "Wrench",
    color: "#8e8e93",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "IntelliJ IDEA" },
      { name: "Postman" },
      { name: "Eraser.io" },
    ],
  },
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Code2,
    Database,
    Cloud,
    Wrench,
    Palette,
    Terminal,
    Cpu,
  };
  return icons[iconName] || Code2;
};

export function Skills({ isDark }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCategoryData = SKILL_CATEGORIES.find(
    (c) => c.id === activeCategory,
  );

  return (
    <div
      className={`relative w-full h-full flex  flex-col md:flex-row ${
        isDark ? "bg-[#0a0a0a]" : "bg-gray-50"
      }`}
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className={`p-2 w-fit md:hidden m-2 ml-auto mr-2 rounded-lg ${isDark ? "bg-white/10" : "bg-black/10"}`}
      >
        <Menu size={18} />
      </button>

      {/* ================= MOBILE SIDEBAR OVERLAY ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-0 left-0 h-full w-60 z-40 border-r ${
                isDark
                  ? "border-white/10 bg-[#1e1e1e]"
                  : "border-black/10 bg-white"
              }`}
            >
              <div className="p-4 pt-16 space-y-1">
                {SKILL_CATEGORIES.map((category) => {
                  const Icon = getIconComponent(category.icon);
                  const isActive = activeCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                        isActive
                          ? isDark
                            ? "bg-white/10 text-white"
                            : "bg-black/10 text-gray-900"
                          : isDark
                            ? "text-white/70 hover:bg-white/5"
                            : "text-gray-600 hover:bg-black/5"
                      }`}
                    >
                      <Icon size={16} style={{ color: category.color }} />
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className={`hidden md:block w-60 border-r ${
          isDark ? "border-white/10 bg-[#1e1e1e]" : "border-black/10 bg-white"
        }`}
      >
        <div className="p-4 space-y-1">
          <h2
            className={`text-lg font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Skills
          </h2>

          {SKILL_CATEGORIES.map((category) => {
            const Icon = getIconComponent(category.icon);
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  isActive
                    ? isDark
                      ? "bg-white/10 text-white"
                      : "bg-black/10 text-gray-900"
                    : isDark
                      ? "text-white/70 hover:bg-white/5"
                      : "text-gray-600 hover:bg-black/5"
                }`}
              >
                <Icon size={16} style={{ color: category.color }} />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-6 pt-20 md:pt-6 overflow-auto">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1
            className={`text-2xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {activeCategoryData?.name}
          </h1>

          <div className="flex flex-wrap gap-3">
            {activeCategoryData?.skills.map((skill) => (
              <div
                key={skill.name}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDark ? "bg-white/10 text-white" : "bg-white text-gray-800"
                }`}
                style={{
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
                  }`,
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
