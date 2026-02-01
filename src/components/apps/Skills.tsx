import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cloud, 
  Wrench, 
  Palette,
  Terminal,
  Cpu
} from 'lucide-react';

interface SkillsProps {
  isDark: boolean;
}

interface Skill {
  name: string;
  level: number;
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
    id: 'languages',
    name: 'Languages',
    icon: 'Code2',
    color: '#007aff',
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'SQL', level: 88 },
      { name: 'PHP', level: 70 },
      { name: 'C/C++', level: 65 },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend & UI',
    icon: 'Palette',
    color: '#af52de',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Redux Toolkit', level: 85 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Frameworks',
    icon: 'Terminal',
    color: '#34c759',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Express.js', level: 90 },
      { name: 'Prisma', level: 88 },
      { name: 'WebSockets', level: 80 },
      { name: 'REST APIs', level: 95 },
    ],
  },
  {
    id: 'database',
    name: 'Databases & Messaging',
    icon: 'Database',
    color: '#ff9500',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redis', level: 82 },
      { name: 'Apache Kafka', level: 75 },
      { name: 'ClickHouse', level: 70 },
      { name: 'Pinecone', level: 72 },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    color: '#5ac8fa',
    skills: [
      { name: 'AWS (EC2, S3, ECS, ECR)', level: 88 },
      { name: 'Docker', level: 90 },
      { name: 'Nginx', level: 80 },
      { name: 'Firebase', level: 85 },
      { name: 'GitHub CI/CD', level: 82 },
      { name: 'Terraform', level: 65 },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Automation',
    icon: 'Cpu',
    color: '#ff3b30',
    skills: [
      { name: 'Vapi AI', level: 88 },
      { name: 'RAG (Retrieval-Augmented Gen)', level: 82 },
      { name: 'n8n', level: 85 },
      { name: 'LLM API Integration', level: 88 },
      { name: 'Machine Learning', level: 75 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: 'Wrench',
    color: '#8e8e93',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'GitHub', level: 95 },
      { name: 'VS Code', level: 95 },
      { name: 'IntelliJ IDEA', level: 80 },
      { name: 'Postman', level: 90 },
      { name: 'Eraser.io', level: 75 },
    ],
  },
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Code2, Database, Cloud, Wrench, Palette, Terminal, Cpu,
  };
  return icons[iconName] || Code2;
};

export function Skills({ isDark }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('languages');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeSkills = SKILL_CATEGORIES.find(c => c.id === activeCategory)?.skills || [];

  return (
    <div className={`w-full h-full flex ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`w-60 flex-shrink-0 border-r ${
        isDark ? 'border-white/10 bg-[#1e1e1e]' : 'border-black/10 bg-white'
      }`}>
        <div className="p-4">
          <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Skills
          </h2>
          <div className="space-y-1">
            {SKILL_CATEGORIES.map((category) => {
              const Icon = getIconComponent(category.icon);
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-white/10 text-white'
                        : 'bg-black/10 text-gray-900'
                      : isDark
                        ? 'text-white/70 hover:bg-white/5'
                        : 'text-gray-600 hover:bg-black/5'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: category.color }} />
                  </div>
                  <span className="font-medium text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {SKILL_CATEGORIES.find(c => c.id === activeCategory)?.name}
            </h1>
            <p className={`mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
              Technologies and tools I work with daily
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-5">
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl ${
                  isDark ? 'bg-white/5' : 'bg-white'
                }`}
                style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {skill.name}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className={`h-2.5 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-gray-200'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
                    className="h-full rounded-full relative"
                    style={{
                      background: `linear-gradient(90deg, ${SKILL_CATEGORIES.find(c => c.id === activeCategory)?.color}, ${SKILL_CATEGORIES.find(c => c.id === activeCategory)?.color}80)`,
                    }}
                  >
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: `0 0 20px ${SKILL_CATEGORIES.find(c => c.id === activeCategory)?.color}50`,
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className={`mt-8 p-6 rounded-xl ${
            isDark ? 'bg-white/5' : 'bg-white'
          }`}
          style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
          >
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Proficiency Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Expert', count: activeSkills.filter(s => s.level >= 90).length },
                { label: 'Advanced', count: activeSkills.filter(s => s.level >= 75 && s.level < 90).length },
                { label: 'Intermediate', count: activeSkills.filter(s => s.level < 75).length },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className={`text-2xl font-bold ${
                    isDark ? 'text-[#007aff]' : 'text-blue-600'
                  }`}>
                    {item.count}
                  </div>
                  <div className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
