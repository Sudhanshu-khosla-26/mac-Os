import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Calendar, MapPin, ChevronRight, ExternalLink } from 'lucide-react';

interface ExperienceProps {
  isDark: boolean;
}

interface Job {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  color: string;
  link?: string;
}

const EXPERIENCES: Job[] = [
  {
    id: 'nitya',
    company: 'Nitya Consulting Services',
    role: 'Full Stack Developer Intern',
    type: 'Remote',
    location: 'Remote',
    startDate: 'Aug 2025',
    endDate: 'Nov 2025',
    description: [
      'Developed AI recruitment platforms using Next.js for automated candidate screening, bulk resume analysis, and JD relevance scoring',
      'Implemented automated interviews using 3D AI agent (Vapi) with structured evaluation rounds, reducing manual screening effort by 60%',
      'Designed database architecture, ER diagrams, and workflows supporting internal and external applications',
      'Built real estate automation platform integrating n8n and Vapi AI for automated calls and lead management, improving efficiency by 50%',
    ],
    technologies: ['Next.js', 'Vapi AI', 'n8n', 'PostgreSQL', 'Prisma', 'OpenAI'],
    color: '#007aff',
  },
  {
    id: 'iisd',
    company: 'International Institute of SDGs and Public Policy Research',
    role: 'Full Stack Developer Intern',
    type: 'Remote',
    location: 'Remote',
    startDate: 'April 2025',
    endDate: 'May 2025',
    description: [
      'Developed a comprehensive Intern Management Portal using the MERN stack, enabling HRs, Admins, and Interns to interact seamlessly',
      'Implemented features like attendance tracking, batch creation, task assignment, performance-based ranking, and role-based access control',
      'Designed user workflows for promoting/demoting interns, permission-based task actions, and task review with point-based evaluation',
      'Collaborated with cross-functional teams, gaining hands-on experience in team leadership, agile development and end-to-end deployment',
    ],
    technologies: ['MERN Stack', 'Redux Toolkit', 'JWT', 'Tailwind CSS'],
    color: '#34c759',
  },
];

export function Experience({ isDark }: ExperienceProps) {
  const [expandedJobs, setExpandedJobs] = useState<string[]>(['nitya']);

  const toggleExpanded = (jobId: string) => {
    setExpandedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className={`w-full h-full overflow-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 px-6 py-4 border-b ${
        isDark ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-gray-50/95 border-black/10'
      }`}>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Experience
        </h1>
        <p className={`mt-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
          My professional journey and internships
        </p>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-6 top-0 bottom-0 w-px ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          }`} />

          {/* Experience Items */}
          <div className="space-y-6">
            {EXPERIENCES.map((job, index) => {
              const isExpanded = expandedJobs.includes(job.id);

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-14"
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-4 top-2 w-4 h-4 rounded-full border-2"
                    style={{ 
                      borderColor: job.color,
                      backgroundColor: isDark ? '#0a0a0a' : '#f9fafb',
                    }}
                  />

                  {/* Content Card */}
                  <div
                    className={`rounded-xl overflow-hidden transition-all ${
                      isDark ? 'bg-[#1e1e1e]' : 'bg-white'
                    }`}
                    style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleExpanded(job.id)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          {/* Company Logo Placeholder */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${job.color}20` }}
                          >
                            <Building2 className="w-6 h-6" style={{ color: job.color }} />
                          </div>

                          <div>
                            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {job.role}
                            </h3>
                            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                              {job.company} · {job.type}
                            </p>
                            <div className={`flex items-center gap-4 mt-2 text-sm ${
                              isDark ? 'text-white/40' : 'text-gray-500'
                            }`}>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {job.startDate} - {job.endDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${
                            isExpanded ? 'rotate-90' : ''
                          } ${isDark ? 'text-white/40' : 'text-gray-400'}`}
                        />
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
                        >
                          <div className="p-5">
                            {/* Description */}
                            <ul className={`space-y-2 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                              {job.description.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: job.color }} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Technologies */}
                            <div className="mt-4">
                              <h4 className={`text-sm font-medium mb-2 ${
                                isDark ? 'text-white/40' : 'text-gray-400'
                              }`}>
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                      isDark 
                                        ? 'bg-white/10 text-white/70' 
                                        : 'bg-black/10 text-gray-600'
                                    }`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leadership Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-8 p-6 rounded-xl ${
            isDark ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}
          style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
        >
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Leadership & Activities
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-[#ff9500]/20' : 'bg-orange-100'
              }`}>
                <Building2 className={`w-5 h-5 ${isDark ? 'text-[#ff9500]' : 'text-orange-600'}`} />
              </div>
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Web Development Lead
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Code Geeks - Official Coding Society of GTB4CEC
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                  Led web development initiatives and mentored junior developers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-[#af52de]/20' : 'bg-purple-100'
              }`}>
                <ExternalLink className={`w-5 h-5 ${isDark ? 'text-[#af52de]' : 'text-purple-600'}`} />
              </div>
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Hackathon Website Developer
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  Code-Zen - College Hackathon
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                  Developed the official website for the college hackathon event
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-[#34c759]/20' : 'bg-green-100'
              }`}>
                <Calendar className={`w-5 h-5 ${isDark ? 'text-[#34c759]' : 'text-green-600'}`} />
              </div>
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Student Coordinator
                </h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                  College Tech Fest
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                  Developed the official website and oversaw event organization
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
