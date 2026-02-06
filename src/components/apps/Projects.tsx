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
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop",
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
    gradient: "from-primary to-blue-500",
    iconColor: "text-primary",
  },
  {
    id: "videotube",
    name: "VideoTube",
    description: "Mood-based video recommendation platform",
    longDescription:
      "An intelligent video platform with mood-based recommendations using Gemini AI, featuring user authentication, video uploads, and interactive features like comments and subscriptions. The platform analyzes user emotions and preferences to deliver personalized content experiences.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
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
    gradient: "from-rose-500 to-red-500",
    iconColor: "text-rose-500",
  },
  {
    id: "ai-recruitment",
    name: "AI Recruitment Platform",
    description: "Automated candidate screening with 3D AI agents",
    longDescription:
      "An AI-powered recruitment platform featuring automated candidate screening, bulk resume analysis, JD relevance scoring, and 3D AI agent interviews using Vapi. The platform revolutionizes the hiring process by combining AI intelligence with human-like interactions.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
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
    gradient: "from-success to-emerald-400",
    iconColor: "text-success",
  },
  {
    id: "realestate",
    name: "Real Estate Automation",
    description: "Lead management with AI-powered calls",
    longDescription:
      "A real estate automation platform integrating n8n and Vapi AI for automated calls and lead management, improving operational efficiency by 50%. The system handles lead qualification, follow-ups, and scheduling with minimal human intervention.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
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
    gradient: "from-accent to-purple-500",
    iconColor: "text-accent",
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
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

        {/* {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          </div>
        )} */}

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-card/80 text-foreground backdrop-blur-sm border border-border/50">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
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

        {/* Tech Stack Preview */}
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
      {/* Sticky Header */}
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
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden mb-8 border border-border/50"
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full max-h-[500px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
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

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Actions */}
            <div className="flex flex-col gap-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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

            {/* Metrics */}
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

            {/* Tech Stack */}
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

            {/* Metadata */}
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
      {/* Background Effects */}
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Header */}
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

              {/* Filter Tabs */}
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

              {/* Projects Grid */}
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
