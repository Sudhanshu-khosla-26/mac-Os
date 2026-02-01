import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  CheckCircle,
  Printer,
  Copy,
  ExternalLink
} from 'lucide-react';

interface ResumeProps {
  isDark: boolean;
}

const RESUME_SECTIONS = [
  {
    id: 'summary',
    title: 'Professional Summary',
    content: 'Full Stack Developer seeking opportunities in innovative IT organizations to apply core computer science skills, contribute to scalable solutions, and grow through continuous learning. Passionate about building impactful, user-centric applications using modern web technologies.',
  },
  {
    id: 'experience',
    title: 'Work Experience',
    items: [
      {
        title: 'Full Stack Developer Intern',
        company: 'Nitya Consulting Services',
        period: 'Aug 2025 - Nov 2025',
        bullets: [
          'Developed AI recruitment platforms using Next.js for automated candidate screening',
          'Implemented 3D AI agent interviews using Vapi, reducing manual screening by 60%',
          'Built real estate automation platform with n8n and Vapi AI, improving efficiency by 50%',
        ],
      },
      {
        title: 'Full Stack Developer Intern',
        company: 'International Institute of SDGs and Public Policy Research',
        period: 'April 2025 - May 2025',
        bullets: [
          'Developed Intern Management Portal using MERN stack with role-based access control',
          'Implemented attendance tracking, batch creation, and performance-based ranking',
          'Gained hands-on experience in team leadership and agile development',
        ],
      },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    items: [
      {
        title: 'B.Tech in Computer Science Engineering',
        company: 'Guru Tegh Bahadur 4th Centenary Engineering College, GGSIPU Delhi',
        period: '2021 - 2025',
        bullets: ['CGPA: 8.2'],
      },
      {
        title: '12th Grade - Science Stream',
        company: 'Tagore Senior Secondary School, CBSE Board Delhi',
        period: '2020 - 2021',
        bullets: ['Percentage: 81%'],
      },
    ],
  },
  {
    id: 'skills',
    title: 'Technical Skills',
    content: 'Languages: JavaScript, Python, Java, SQL, PHP, C/C++ | Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit | Backend: Node.js, Express.js, Prisma, WebSockets | Cloud: AWS (EC2, S3, ECS, ECR), Docker, Nginx, Firebase | Databases: MongoDB, PostgreSQL, Redis, Kafka, ClickHouse | AI: Vapi AI, RAG, n8n, LLM Integration',
  },
];

export function Resume({ isDark }: ResumeProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Sudhanshu_Khosla_Resume.pdf';
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://sudhanshukhosla.dev/resume');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full h-full overflow-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resume
            </h1>
            <p className={`mt-1 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Download or view my resume
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-[#007aff] text-white hover:bg-[#007aff]/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-xl overflow-hidden shadow-2xl ${
            isDark ? 'bg-white' : 'bg-white'
          }`}
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-[#007aff] via-[#af52de] to-[#ff2d55] p-8 text-white">
            <h2 className="text-3xl font-bold">Sudhanshu Khosla</h2>
            <p className="text-lg opacity-90 mt-1">Full Stack Developer</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm opacity-80">
              <span>work.sudhanshukhosla@gmail.com</span>
              <span>•</span>
              <span>+91 8287036184</span>
              <span>•</span>
              <span>Delhi, India</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm opacity-80">
              <span>github.com/Sudhanshu-khosla-26</span>
              <span>•</span>
              <span>linkedin.com/in/sudhanshu-khosla-a05b4a298</span>
            </div>
          </div>

          {/* Resume Content */}
          <div className="p-8 text-gray-800">
            {RESUME_SECTIONS.map((section, index) => (
              <div key={section.id} className={index > 0 ? 'mt-6' : ''}>
                <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">
                  {section.title}
                </h3>

                {section.content && (
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                )}

                {section.items && (
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <span className="text-sm text-gray-500">{item.period}</span>
                        </div>
                        <p className="text-gray-600">{item.company}</p>
                        {item.bullets && (
                          <ul className="mt-2 space-y-1">
                            {item.bullets.map((bullet, j) => (
                              <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-6 p-4 rounded-xl ${
            isDark ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}
          style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
        >
          <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
            isDark ? 'text-white/40' : 'text-gray-400'
          }`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handlePrint}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-white' 
                  : 'bg-black/5 hover:bg-black/10 text-gray-700'
              }`}
            >
              <Printer className="w-6 h-6" />
              <span className="text-sm">Print</span>
            </button>
            <button
              onClick={handleCopyLink}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-white' 
                  : 'bg-black/5 hover:bg-black/10 text-gray-700'
              }`}
            >
              {copied ? (
                <CheckCircle className="w-6 h-6 text-[#34c759]" />
              ) : (
                <Copy className="w-6 h-6" />
              )}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <a
              href="https://drive.google.com/file/d/your-resume-id/view"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-white' 
                  : 'bg-black/5 hover:bg-black/10 text-gray-700'
              }`}
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-sm">View Online</span>
            </a>
          </div>
        </motion.div>

        {/* File Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-4 p-4 rounded-xl ${
            isDark ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}
          style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-[#ff3b30]/20' : 'bg-red-100'
            }`}>
              <FileText className={`w-6 h-6 ${isDark ? 'text-[#ff3b30]' : 'text-red-600'}`} />
            </div>
            <div className="flex-1">
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Sudhanshu_Khosla_Resume.pdf
              </p>
              <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                PDF • Last updated Jan 2025
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
