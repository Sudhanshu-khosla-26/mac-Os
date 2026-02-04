import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Folder,
  Code2,
  Layers,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

// --- Interfaces ---

interface ProjectsProps {
  isDark: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  // Added image property with placeholders for demonstration
  image: string;
  techStack: string[];
  category: string;
  year: string;
  github?: string;
  demo?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  featured: boolean;
  highlights: string[];
  color: string; // Kept color for subtle accents/tags
}

// --- Mock Data (Updated with Image Placeholders) ---

const PROJECTS: Project[] = [
  {
    id: "deployhub",
    name: "DeployHub",
    description: "One-click deployment platform with real-time log tracking",
    longDescription:
      "A comprehensive deployment platform that streamlines the deployment process with one-click deployments, real-time Kafka log tracking, subdomain-based access, and ClickHouse analytics for monitoring. Built to handle production-grade deployments with enterprise-level reliability.",
    // Using a placeholder image service for the demo
    image:
      "https://placehold.co/600x400/007AFF/ffffff?text=DeployHub+Dashboard",
    techStack: [
      "AWS ECS/ECR",
      "PostgreSQL",
      "Kafka",
      "Prisma",
      "ClickHouse",
      "Docker",
      "React.js",
    ],
    category: "DevOps",
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com",
    metrics: [
      { label: "Active Users", value: "2.5K+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Deploy Speed", value: "70% faster" },
    ],
    featured: true,
    highlights: [
      "Real-time log streaming with Kafka for instant deployment feedback",
      "Automatic subdomain-based service access with SSL certificates",
      "ClickHouse analytics dashboard with performance insights",
      "Docker containerization with automated scaling",
    ],
    color: "#007AFF",
  },
  {
    id: "videotube",
    name: "VideoTube",
    description: "Mood-based video recommendation platform",
    longDescription:
      "An intelligent video platform with mood-based recommendations using Gemini AI, featuring user authentication, video uploads, and interactive features like comments and subscriptions. The platform analyzes user emotions and preferences to deliver personalized content experiences.",
    image: "https://placehold.co/600x400/FF3B30/ffffff?text=VideoTube+UI",
    techStack: ["React.js", "Node.js", "MongoDB", "Cloudinary", "Gemini AI"],
    category: "AI/ML",
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com",
    metrics: [
      { label: "Active Users", value: "5K+" },
      { label: "Match Accuracy", value: "85%" },
      { label: "Engagement", value: "3x increase" },
    ],
    featured: true,
    highlights: [
      "AI-powered mood detection using Google Gemini API",
      "Secure video streaming with Cloudinary CDN integration",
      "Real-time notifications for comments and subscriptions",
      "JWT-based authentication with refresh token rotation",
    ],
    color: "#FF3B30",
  },
  {
    id: "ai-recruitment",
    name: "AI Recruitment Platform",
    description: "Automated candidate screening with 3D AI agents",
    longDescription:
      "An AI-powered recruitment platform featuring automated candidate screening, bulk resume analysis, JD relevance scoring, and 3D AI agent interviews using Vapi. The platform revolutionizes the hiring process by combining AI intelligence with human-like interactions.",
    image: "https://placehold.co/600x400/34C759/ffffff?text=AI+Interviewer",
    techStack: [
      "Next.js",
      "Vapi AI",
      "PostgreSQL",
      "Prisma",
      "OpenAI",
      "Tailwind CSS",
    ],
    category: "AI/ML",
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com",
    metrics: [
      { label: "Companies", value: "150+" },
      { label: "Accuracy", value: "90%" },
      { label: "Time Saved", value: "60%" },
    ],
    featured: true,
    highlights: [
      "3D AI interviewer agents with natural conversation capabilities",
      "Bulk resume processing with OpenAI-powered analysis",
      "JD-candidate matching algorithm with relevance scoring",
      "Real-time interview transcription and sentiment analysis",
    ],
    color: "#34C759",
  },
  {
    id: "realestate",
    name: "Real Estate Automation",
    description: "Lead management with AI-powered calls",
    longDescription:
      "A real estate automation platform integrating n8n and Vapi AI for automated calls and lead management, improving operational efficiency by 50%. The system handles lead qualification, follow-ups, and scheduling with minimal human intervention.",
    image: "https://placehold.co/600x400/5856D6/ffffff?text=Automation+Flow",
    techStack: ["Next.js", "n8n", "Vapi AI", "PostgreSQL", "Prisma"],
    category: "Automation",
    year: "2024",
    github: "https://github.com",
    metrics: [
      { label: "Agents", value: "50+" },
      { label: "Efficiency", value: "+50%" },
      { label: "Daily Leads", value: "200+" },
    ],
    featured: false,
    highlights: [
      "50% improvement in operational efficiency",
      "Automated lead follow-up with intelligent scheduling",
      "Smart call routing based on lead quality scores",
      "n8n workflow automation for complex business processes",
    ],
    color: "#5856D6",
  },
  // ... other projects would have images added similarly
];

const CATEGORIES = [
  "All",
  "Featured",
  "AI/ML",
  "DevOps",
  "Full Stack",
  "Automation",
] as const;

// --- Sub-Components ---

// 1. The Project Card (For the Grid View)
function ProjectCard({
  project,
  isDark,
  onClick,
}: {
  project: Project;
  isDark: boolean;
  onClick: () => void;
}) {
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const bgColor = isDark
    ? "bg-[#2d2d2d] hover:bg-[#363636]"
    : "bg-white hover:bg-gray-50";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const mutedTextColor = isDark ? "text-white/60" : "text-gray-600";

  return (
    <article
      // layoutId={`project-container-${project.id}`}
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border ${borderColor} ${bgColor} overflow-hidden transition-all duration-200 flex flex-col h-full`}
    >
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${isDark ? "bg-blue-500/80 text-white" : "bg-blue-600/90 text-white"}`}
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${isDark ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"}`}
          >
            {project.category}
          </span>
          <span className={`text-xs ${mutedTextColor}`}>{project.year}</span>
        </div>
        <h3 className={`text-lg font-bold mb-2 line-clamp-1 ${textColor}`}>
          {project.name}
        </h3>
        <p className={`text-sm line-clamp-2 mb-4 flex-grow ${mutedTextColor}`}>
          {project.description}
        </p>

        {/* Mini Tech Stack Preview */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-dashed ${isDark ? 'border-white/10' : 'border-gray-200'}">
          <Code2 className={`w-4 h-4 ${mutedTextColor}`} />
          <div className="flex gap-1.5 flex-wrap truncate">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className={`text-xs ${mutedTextColor}`}>
                {tech}
                {tech !== project.techStack.slice(0, 3).slice(-1)[0] && " •"}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className={`text-xs ${mutedTextColor}`}>
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// 2. The Project Details View (Full Page)
function ProjectDetails({
  project,
  isDark,
  onClose,
}: {
  project: Project;
  isDark: boolean;
  onClose: () => void;
}) {
  const textColor = isDark ? "text-white" : "text-gray-900";
  const mutedTextColor = isDark ? "text-white/60" : "text-gray-600";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const sectionHeaderColor = isDark ? "text-white/40" : "text-gray-500";

  // Tag styles (flat, no gradient)
  const tagStyle = isDark
    ? "bg-white/10 text-white/90 border border-white/5"
    : "bg-gray-100 text-gray-800 border border-gray-200";

  const buttonBaseStyle =
    "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border";
  const primaryButtonStyle = isDark
    ? `${buttonBaseStyle} bg-blue-600 hover:bg-blue-700 text-white border-transparent`
    : `${buttonBaseStyle} bg-blue-600 hover:bg-blue-700 text-white border-transparent`;
  const secondaryButtonStyle = isDark
    ? `${buttonBaseStyle} bg-transparent hover:bg-white/5 text-white border-white/20`
    : `${buttonBaseStyle} bg-white hover:bg-gray-50 text-gray-900 border-gray-300`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`w-full h-full overflow-y-auto ${isDark ? "bg-[#1e1e1e]" : "bg-[#f5f5f7]"}`}
    >
      {/* Sticky Header */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-md border-b ${borderColor} ${isDark ? "bg-[#1e1e1e]/80" : "bg-[#f5f5f7]/80"}`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onClose}
            aria-label="Back to projects"
            className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-gray-900"}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className={`text-lg font-bold truncate ${textColor}`}>
            {project.name}
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div
          // layoutId={`project-container-${project.id}`}
          className="rounded-2xl overflow-hidden mb-8 border ${borderColor}"
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full max-h-[500px] object-cover object-top"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3
                className={`text-sm font-bold uppercase tracking-wider mb-4 ${sectionHeaderColor}`}
              >
                About the Project
              </h3>
              <p
                className={`text-base leading-relaxed whitespace-pre-line ${mutedTextColor}`}
              >
                {project.longDescription}
              </p>
            </section>

            <section>
              <h3
                className={`text-sm font-bold uppercase tracking-wider mb-4 ${sectionHeaderColor}`}
              >
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                    />
                    <span className={mutedTextColor}>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-8">
            {/* Actions */}
            <div className="flex flex-col gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryButtonStyle}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo <ArrowUpRight className="w-3 h-3 ml-1 opacity-70" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryButtonStyle}
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>

            {/* Metrics Grid */}
            <div
              className={`grid grid-cols-2 gap-4 p-5 rounded-xl border ${borderColor} ${isDark ? "bg-white/5" : "bg-white"}`}
            >
              {project.metrics.map((metric, index) => (
                <div
                  key={index}
                  className={
                    index % 2 === 0 && index !== project.metrics.length - 1
                      ? `border-r ${borderColor}`
                      : ""
                  }
                >
                  <div className={`text-2xl font-bold ${textColor}`}>
                    {metric.value}
                  </div>
                  <div
                    className={`text-xs font-medium uppercase tracking-wide ${mutedTextColor}`}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Info */}
            <section>
              <h3
                className={`text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${sectionHeaderColor}`}
              >
                <Layers className="w-4 h-4" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium ${tagStyle}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
            {/* Metadata */}
            <div
              className={`pt-4 border-t ${borderColor} flex items-center justify-between text-sm ${mutedTextColor}`}
            >
              <span>Category: {project.category}</span>
              <span>Year: {project.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Component ---

export function Projects({ isDark }: ProjectsProps) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  // State to track which project is currently selected for details view
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const filteredProjects = useMemo(() => {
    // If a project is selected, we still want the list context underneath,
    // but for performance, we could limit this. For now, keep filtering live.
    return PROJECTS.filter((project) => {
      if (activeCategory === "All") return true;
      if (activeCategory === "Featured") return project.featured;
      return project.category === activeCategory;
    });
  }, [activeCategory]);

  const selectedProject = useMemo(() => {
    return PROJECTS.find((p) => p.id === selectedProjectId);
  }, [selectedProjectId]);

  const handleCloseDetails = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  // Base colors used for borders and backgrounds throughout
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const toolbarBg = isDark ? "bg-[#1e1e1e]" : "bg-[#f5f5f7]";

  return (
    <div className={`relative w-full h-full overflow-hidden ${toolbarBg}`}>
      <AnimatePresence mode="wait">
        {/* CONDITIONAL RENDERING: Show Details View OR List View */}

        {selectedProjectId && selectedProject ? (
          // --- DETAILS VIEW ---
          <ProjectDetails
            key="details"
            project={selectedProject}
            isDark={isDark}
            onClose={handleCloseDetails}
          />
        ) : (
          // --- LIST VIEW (GRID) ---
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col"
          >
            {/* Header / Filter Bar */}
            <div
              className={`flex-shrink-0 border-b ${borderColor} bg-inherit z-10`}
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Folder
                    className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                  />
                  <h2
                    className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Projects
                  </h2>
                  <span
                    className={`ml-2 text-sm font-medium px-2.5 py-0.5 rounded-full ${isDark ? "bg-white/10 text-white/60" : "bg-black/5 text-gray-500"}`}
                  >
                    {filteredProjects.length}
                  </span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="px-6 pb-3 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  // Flat button style, no gradient
                  const activeStyle = isDark
                    ? "bg-white text-gray-900"
                    : "bg-gray-900 text-white";
                  const inactiveStyle = isDark
                    ? "text-white/60 hover:bg-white/10 hover:text-white"
                    : "text-gray-600 hover:bg-black/5 hover:text-gray-900";
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive ? activeStyle : inactiveStyle}`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Grid Area */}
            <div className="flex-grow overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isDark={isDark}
                    onClick={() => setSelectedProjectId(project.id)}
                  />
                ))}
              </div>
              {filteredProjects.length === 0 && (
                <div
                  className={`text-center py-20 ${isDark ? "text-white/40" : "text-gray-500"}`}
                >
                  No projects found in this category.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
