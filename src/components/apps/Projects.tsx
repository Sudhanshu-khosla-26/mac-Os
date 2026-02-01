import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, LayoutGrid, List as ListIcon, ChevronDown, ChevronUp, Code2, Rocket, Zap } from 'lucide-react';

interface ProjectsProps {
  isDark: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  github?: string;
  demo?: string;
  stars: number;
  forks: number;
  featured: boolean;
  highlights?: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'deployhub',
    name: 'DeployHub',
    description: 'One-click deployment platform with real-time log tracking',
    longDescription: 'A comprehensive deployment platform that streamlines the deployment process with one-click deployments, real-time Kafka log tracking, subdomain-based access, and ClickHouse analytics for monitoring.',
    techStack: ['AWS ECS/ECR', 'PostgreSQL', 'Kafka', 'Prisma', 'ClickHouse', 'Docker', 'Express.js', 'React.js'],
    image: 'deploy',
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 245,
    forks: 56,
    featured: true,
    highlights: ['Real-time log streaming with Kafka', 'Subdomain-based service access', 'ClickHouse analytics dashboard'],
  },
  {
    id: 'videotube',
    name: 'VideoTube',
    description: 'Mood-based video recommendation platform',
    longDescription: 'An intelligent video platform with mood-based recommendations using Gemini AI, featuring user authentication, video uploads, and interactive features like comments and subscriptions.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT', 'Gemini AI'],
    image: 'video',
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 189,
    forks: 42,
    featured: true,
    highlights: ['AI-powered mood detection', 'Secure video streaming', 'Real-time notifications'],
  },
  {
    id: 'ai-recruitment',
    name: 'AI Recruitment Platform',
    description: 'Automated candidate screening with 3D AI agents',
    longDescription: 'An AI-powered recruitment platform featuring automated candidate screening, bulk resume analysis, JD relevance scoring, and 3D AI agent interviews using Vapi.',
    techStack: ['Next.js', 'Vapi AI', 'PostgreSQL', 'Prisma', 'OpenAI', 'Tailwind CSS'],
    image: 'recruitment',
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 312,
    forks: 78,
    featured: true,
    highlights: ['3D AI interviewer agents', 'Bulk resume processing', 'JD-candidate matching'],
  },
  {
    id: 'realestate',
    name: 'Real Estate Automation',
    description: 'Lead management with AI-powered calls',
    longDescription: 'A real estate automation platform integrating n8n and Vapi AI for automated calls and lead management, improving operational efficiency by 50%.',
    techStack: ['Next.js', 'n8n', 'Vapi AI', 'PostgreSQL', 'Prisma'],
    image: 'realestate',
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 156,
    forks: 34,
    featured: false,
    highlights: ['50% efficiency improvement', 'Automated lead follow-up', 'Smart scheduling'],
  },
  {
    id: 'internportal',
    name: 'Intern Management Portal',
    description: 'Comprehensive intern tracking and evaluation system',
    longDescription: 'A full-featured intern management portal with attendance tracking, batch creation, task assignment, performance-based ranking, and role-based access control.',
    techStack: ['MERN Stack', 'JWT', 'Redux Toolkit', 'Tailwind CSS'],
    image: 'intern',
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 98,
    forks: 23,
    featured: false,
    highlights: ['Performance analytics', 'Batch management', 'Role-based permissions'],
  },
  {
    id: 'codezen',
    name: 'Code-Zen Hackathon',
    description: 'Official website for college hackathon',
    longDescription: 'The official website for Code-Zen, the college hackathon, featuring event registration, schedule, sponsor information, and live updates.',
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: 'hackathon',
    github: 'https://github.com',
    demo: 'https://demo.com',
    stars: 267,
    forks: 89,
    featured: false,
    highlights: ['Live event tracking', 'Team registration', 'Sponsor showcase'],
  },
];

const FILTERS = ['All', 'Featured', 'Full Stack', 'AI/ML'];

export function Projects({ isDark }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = PROJECTS.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return project.featured;
    if (activeFilter === 'Full Stack') return project.techStack.some(t => ['React.js', 'Node.js', 'Next.js'].includes(t));
    if (activeFilter === 'AI/ML') return project.techStack.some(t => ['Vapi AI', 'Gemini AI', 'OpenAI', 'n8n'].includes(t));
    return true;
  });

  const toggleExpand = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className={`w-full h-full overflow-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 px-6 py-4 border-b ${
        isDark ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-gray-50/95 border-black/10'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Projects
            </h1>
            <p className={`mt-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              A collection of my recent work and side projects
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-lg ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#007aff] text-white'
                  : isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#007aff] text-white'
                  : isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-[#007aff] text-white'
                  : isDark
                    ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    : 'bg-black/10 text-gray-700 hover:bg-black/20 hover:text-gray-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="p-6">
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
          : 'space-y-3'
        }>
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id;
            
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  viewMode === 'list' && !isExpanded ? 'flex items-center gap-4 p-4' : ''
                } ${
                  isDark 
                    ? 'bg-[#1e1e1e] hover:bg-[#252525]' 
                    : 'bg-white hover:shadow-lg'
                }`}
                style={{
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                }}
              >
                {/* Collapsed View */}
                {!isExpanded && (
                  <>
                    {/* Project Icon */}
                    <div 
                      onClick={() => toggleExpand(project.id)}
                      className={`flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                        viewMode === 'grid' 
                          ? `h-40 ${isDark ? 'bg-gradient-to-br from-[#007aff]/20 to-[#5ac8fa]/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`
                          : `w-14 h-14 rounded-xl flex-shrink-0 ${isDark ? 'bg-[#007aff]/20' : 'bg-blue-100'}`
                      }`}
                    >
                      <div className={`${
                        viewMode === 'grid' 
                          ? 'w-16 h-16 rounded-2xl' 
                          : 'w-10 h-10 rounded-lg'
                      } flex items-center justify-center ${
                        isDark ? 'bg-[#007aff]/30' : 'bg-blue-200/50'
                      }`}>
                        <Code2 className={`${viewMode === 'grid' ? 'w-8 h-8' : 'w-5 h-5'} ${isDark ? 'text-[#007aff]' : 'text-blue-600'}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={viewMode === 'grid' ? 'p-5' : 'flex-1'}>
                      <div 
                        onClick={() => toggleExpand(project.id)}
                        className="flex items-start justify-between cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {project.name}
                            </h3>
                            {project.featured && (
                              <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                                isDark 
                                  ? 'bg-[#ff9500]/20 text-[#ff9500]' 
                                  : 'bg-orange-100 text-orange-600'
                              }`}>
                                <Zap className="w-3 h-3" />
                                Featured
                              </span>
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                            {project.description}
                          </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-400'} transition-transform`} />
                      </div>

                      {/* Tech Stack Preview */}
                      <div className={`flex flex-wrap gap-1.5 mt-3 ${viewMode === 'list' ? 'hidden sm:flex' : ''}`}>
                        {project.techStack.slice(0, viewMode === 'grid' ? 4 : 3).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded-md text-xs ${
                              isDark 
                                ? 'bg-white/5 text-white/60' 
                                : 'bg-black/5 text-gray-600'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > (viewMode === 'grid' ? 4 : 3) && (
                          <span className={`px-2 py-0.5 rounded-md text-xs ${
                            isDark ? 'text-white/40' : 'text-gray-400'
                          }`}>
                            +{project.techStack.length - (viewMode === 'grid' ? 4 : 3)}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className={`flex items-center gap-4 mt-3 ${viewMode === 'list' ? 'mt-2' : ''}`}>
                        <div className={`flex items-center gap-1 text-sm ${
                          isDark ? 'text-white/50' : 'text-gray-500'
                        }`}>
                          <Star className="w-4 h-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          isDark ? 'text-white/50' : 'text-gray-500'
                        }`}>
                          <GitFork className="w-4 h-4" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Expanded View - Inline Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="p-5"
                    >
                      {/* Header with close button */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isDark ? 'bg-[#007aff]/20' : 'bg-blue-100'
                          }`}>
                            <Rocket className={`w-6 h-6 ${isDark ? 'text-[#007aff]' : 'text-blue-600'}`} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {project.name}
                            </h3>
                            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                              {project.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleExpand(project.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                          }`}
                        >
                          <ChevronUp className={`w-5 h-5 ${isDark ? 'text-white/60' : 'text-gray-500'}`} />
                        </button>
                      </div>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                        {project.longDescription}
                      </p>

                      {/* Highlights */}
                      {project.highlights && (
                        <div className="mb-5">
                          <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                            isDark ? 'text-white/40' : 'text-gray-400'
                          }`}>
                            Key Highlights
                          </h4>
                          <ul className="space-y-1.5">
                            {project.highlights.map((highlight, i) => (
                              <li 
                                key={i} 
                                className={`flex items-center gap-2 text-sm ${
                                  isDark ? 'text-white/70' : 'text-gray-600'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Full Tech Stack */}
                      <div className="mb-5">
                        <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                          isDark ? 'text-white/40' : 'text-gray-400'
                        }`}>
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`px-3 py-1.5 rounded-lg text-sm ${
                                isDark 
                                  ? 'bg-white/10 text-white/80' 
                                  : 'bg-black/10 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className={`flex items-center gap-6 mb-5 py-3 border-y ${
                        isDark ? 'border-white/10' : 'border-black/10'
                      }`}>
                        <div className={`flex items-center gap-2 ${
                          isDark ? 'text-white/70' : 'text-gray-700'
                        }`}>
                          <Star className="w-4 h-4" />
                          <span className="text-sm font-medium">{project.stars} stars</span>
                        </div>
                        <div className={`flex items-center gap-2 ${
                          isDark ? 'text-white/70' : 'text-gray-700'
                        }`}>
                          <GitFork className="w-4 h-4" />
                          <span className="text-sm font-medium">{project.forks} forks</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#007aff] text-white rounded-xl font-medium hover:bg-[#007aff]/90 transition-colors text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${
                              isDark 
                                ? 'bg-white/10 text-white hover:bg-white/20' 
                                : 'bg-black/10 text-gray-900 hover:bg-black/20'
                            }`}
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
