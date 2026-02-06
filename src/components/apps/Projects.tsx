"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
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
  gradient: string;
  iconColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "deployhub",
    name: "DeployHub",
    description: "One-click deployment platform with real-time log tracking",
    longDescription:
      "A comprehensive deployment platform that streamlines the deployment process with one-click deployments, real-time Kafka log tracking, subdomain-based access, and ClickHouse analytics for monitoring. Built to handle production-grade deployments with enterprise-level reliability.",
    image: "/projects/Screenshot (1186).png",
    techStack: [
      "AWS (ECS/ECR/S3/EC2)",
      "PostgreSQL",
      "Kafka",
      "Prisma",
      "ClickHouse",
      "Docker",
      "Node.js",
      "React.js",
    ],
    category: "DevOps",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26/DeployHub",
    demo: "https://drive.google.com/file/d/14nQwtORCnQ61i_-zThsVsaBCtsU3yEn5/view",
    metrics: [{ label: "Uptime", value: "99.9%" }],
    featured: true,
    highlights: [
      "Real-time log tracking with Kafka and ClickHouse analytics",
      "One-click deployments using AWS ECS, ECR, and S3",
      "Subdomain-based access with reverse proxy and Docker",
      "Enhanced status tracking and simplified live previews",
    ],
    gradient: "from-primary to-blue-500",
    iconColor: "text-primary",
  },
  {
    id: "videotube",
    name: "VideoTube",
    description: "Mood-based video recommendation platform",
    longDescription:
      "An intelligent video platform with mood-based recommendations using Gemini AI, featuring user authentication, video uploads, and interactive features like comments and subscriptions.",
    image: "/projects/Screenshot (1182).png",
    techStack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "Gemini AI",
      "JWT",
    ],
    category: "AI/ML",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26",
    demo: "https://videotube-cyan.vercel.app/",
    metrics: [
      { label: "Match Accuracy", value: "85%" },
      { label: "Load Times", value: "Optimized" },
    ],
    featured: false,
    highlights: [
      "AI-powered mood-based video recommendations via Gemini AI",
      "Secure authentication and JWT-based session management",
      "Enhanced video load times through Cloudinary integration",
      "Full interactive features including like, comment, and subscribe",
    ],
    gradient: "from-rose-500 to-red-500",
    iconColor: "text-rose-500",
  },
  {
    id: "avinya",
    name: "Avinya Website",
    description: "Official tech fest platform with 1000+ viewers",
    longDescription:
      "Developed the official website for Avinya, the college tech fest. Focused on high-performance animations using Framer Motion and significant SEO optimization to handle high traffic.",
    image: "/projects/Screenshot (1183).png",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "SEO"],
    category: "Full Stack",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26/avinya_2025",
    demo: "https://avinya-2025-nu.vercel.app/",
    metrics: [
      { label: "Viewers", value: "1000+" },
      { label: "Days", value: "10" },
    ],
    featured: false,
    highlights: [
      "Reached 1000+ viewers in just 10 days post-launch",
      "Fully SEO optimized for maximum visibility and engagement",
      "Implemented complex UI animations with Framer Motion",
      "Managed event organization and student coordination",
    ],
    gradient: "from-orange-500 to-yellow-500",
    iconColor: "text-orange-500",
  },

  {
    id: "recruito-ai",
    name: "Recruito AI",
    description:
      "AI recruitment platform with 3D agents and automated screening",
    longDescription:
      "Developed an AI recruitment platform using Next.js for automated candidate screening and JD relevance scoring. Features a 3D AI agent (Vapi) for structured interviews, significantly reducing manual screening efforts.",
    image: "/projects/Screenshot (1185).png",
    techStack: [
      "Next.js",
      "Vapi AI",
      "PostgreSQL",
      "Prisma",
      "3D AI Agent",
      "Tailwind CSS",
    ],
    category: "AI/ML",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26",
    demo: "",
    metrics: [
      { label: "Manual Effort", value: "-60%" },
      { label: "Accuracy", value: "90%" },
    ],
    featured: true,
    highlights: [
      "Implemented automated interviews using 3D AI agent (Vapi)",
      "Reduced manual screening effort by 60% with structured evaluation",
      "Bulk resume analysis and JD relevance scoring architecture",
      "Designed database architecture and ER diagrams for scale",
    ],
    gradient: "from-success to-emerald-400",
    iconColor: "text-success",
  },
  {
    id: "realestate",
    name: "Real Estate Automation",
    description: "Lead management with AI-powered calls",
    longDescription:
      "A real estate automation platform integrating n8n and Vapi AI for automated calls and lead management, improving operational efficiency by 50%.",
    image: "/projects/Screenshot (1184).png",
    techStack: ["Next.js", "n8n", "Vapi AI", "PostgreSQL", "Prisma"],
    category: "Automation",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26",
    demo: "",
    metrics: [
      { label: "Efficiency", value: "+50%" },
      { label: "Daily Leads", value: "200+" },
    ],
    featured: false,
    highlights: [
      "Improved operational efficiency by 50% via AI automation",
      "Automated calls and lead qualification using Vapi AI",
      "n8n workflow integration for complex lead management",
      "Reduced human intervention in routine follow-ups",
    ],
    gradient: "from-accent to-purple-500",
    iconColor: "text-accent",
  },
  {
    id: "intern-portal",
    name: "Intern Management Portal",
    description: "Enterprise system designed to manage 5000+ users",
    longDescription:
      "Developed a comprehensive MERN stack portal for the International Institute of SDGs. The system enables HRs, Admins, and Interns to interact seamlessly, featuring attendance tracking, task assignment with point-based evaluation, and role-based access control.",
    image: "/projects/Screenshot (632).png",
    techStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Redux Toolkit",
    ],
    category: "Full Stack",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26",
    demo: "",
    metrics: [
      { label: "User Capacity", value: "5000+" },
      { label: "Stack", value: "MERN" },
    ],
    featured: true,
    highlights: [
      "Designed to handle and manage 5000+ users seamlessly",
      "Implemented role-based access control and attendance tracking",
      "Point-based task evaluation and performance-based ranking",
      "Automated batch creation and permission-based actions",
    ],
    gradient: "from-blue-600 to-indigo-600",
    iconColor: "text-blue-500",
  },
  {
    id: "code-zen",
    name: "Code-Zen Hackathon",
    description: "Official platform for the college hackathon",
    longDescription:
      "Developed the official website for Code-Zen, the college hackathon. Managed registration flows and event roles as the Web Development Lead.",
    image: "/projects/Screenshot (1189).png",
    techStack: ["Next.js", "Tailwind CSS", "Node.js"],
    category: "Full Stack",
    year: "2025",
    github: "https://github.com/Sudhanshu-khosla-26/CodeZen",
    demo: "https://codezen-eight.vercel.app/",
    metrics: [
      { label: "Role", value: "Web Lead" },
      { label: "Impact", value: "Event Success" },
    ],
    featured: false,
    highlights: [
      "Led web development for the official college hackathon platform",
      "Built with Next.js for high performance and reliability",
      "Managed registration flows and event role coordination",
      "Integrated live links and event tracking features",
    ],
    gradient: "from-purple-600 to-blue-600",
    iconColor: "text-purple-500",
  },
  {
    id: "netflix-clone",
    name: "Netflix Clone",
    description: "Video streaming UI with TMDB and YouTube API",
    longDescription:
      "A pixel-perfect Netflix replica that fetches real-time movie data using TMDB and allows users to watch trailers via the YouTube Search API.",
    image: "/projects/Screenshot (1188).png",
    techStack: ["HTML", "CSS", "JavaScript", "TMDB API", "YouTube API"],
    category: "Full Stack",
    year: "2024",
    demo: "https://codezen-eight.vercel.app/",
    github: "https://github.com/Sudhanshu-khosla-26/Netflix-clone-1.1",
    metrics: [
      { label: "API", value: "TMDB/YT" },
      { label: "UI", value: "Responsive" },
    ],
    featured: false,
    highlights: [
      "Dynamic data fetching using The Movies Database (TMDB) API",
      "Integrated YouTube Search API for movie trailer playback",
      "Custom responsive CSS layout mimicking original Netflix UI",
      "Optimized search and filtering for movie discovery",
    ],
    gradient: "from-red-600 to-black",
    iconColor: "text-red-600",
  },
];

const CATEGORIES = [
  "All",
  "Featured",
  "AI/ML",
  "DevOps",
  "Full Stack",
  "Automation",
] as const;

function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer glass-card-hover overflow-hidden flex flex-col h-full"
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-t-lg bg-secondary">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          className="w-full h-full object-contain object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Lighter dark gradient overlay - starts from 60% down */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% via-black/30 to-black/50 transition-opacity duration-500 group-hover:to-black/60 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card/90 text-foreground backdrop-blur-sm border border-border/50">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
          <Layers className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-1.5 flex-wrap">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="tech-badge text-xs py-1">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetails({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={onClose}
            aria-label="Back to projects"
            className="p-2 rounded-xl hover:bg-secondary text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-foreground truncate">
            {project.name}
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative  overflow-hidden mb-8 "
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full  border rounded-xl object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                About the Project
              </h3>
              <p className="text-base leading-relaxed text-foreground/80">
                {project.longDescription}
              </p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-success" />
                    <span className="text-foreground/80">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3">
              {project.demo !== "" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 cursor-pointer rounded-xl font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                  <ArrowUpRight className="w-3 h-3 ml-1 opacity-70" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-secondary/80 border border-border transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Metrics
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {project.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const filteredProjects = useMemo(() => {
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

  return (
    <div className="min-h-screen bg-background overflow-auto">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-success/5 rounded-full blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {selectedProjectId && selectedProject ? (
          <ProjectDetails
            key="details"
            project={selectedProject}
            onClose={handleCloseDetails}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
                      Projects
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      A selection of my recent work and side projects.
                    </p>
                  </div>
                  <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    {filteredProjects.length} projects
                  </span>
                </div>
              </motion.header>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProjectId(project.id)}
                  />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
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

export default Projects;
