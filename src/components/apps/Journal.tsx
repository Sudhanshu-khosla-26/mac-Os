import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  ChevronLeft, 
  Smile, 
  Zap, 
  Sun,
  CloudRain,
  BookOpen,
  Plus,
  Search
} from 'lucide-react';
import type { JournalEntry } from '@/types';

interface JournalProps {
  isDark: boolean;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: '2025-01-28',
    title: 'First Day at Nitya Consulting',
    content: `Today was my first day as a Full Stack Developer Intern at Nitya Consulting Services. I'm excited to work on AI-powered recruitment platforms using Next.js and Vapi AI. The team seems welcoming and the projects look challenging but rewarding. Looking forward to learning more about automated candidate screening and 3D AI agents.`,
    mood: 'excited',
  },
  {
    id: '2',
    date: '2025-01-15',
    title: 'DeployHub is Live!',
    content: `Finally deployed DeployHub - my one-click deployment platform! It was a challenging project involving AWS ECS, Kafka for real-time logs, and ClickHouse for analytics. Seeing it live and working smoothly is incredibly satisfying. The subdomain-based access feature is working perfectly.`,
    mood: 'productive',
  },
  {
    id: '3',
    date: '2024-12-20',
    title: 'End of Semester Reflections',
    content: `This semester has been intense. Balanced my B.Tech coursework with two internships and multiple projects. My CGPA is holding steady at 8.2, and I've learned so much about the MERN stack, cloud technologies, and AI integration. The Intern Management Portal I built was particularly rewarding - seeing it help HR teams streamline their processes.`,
    mood: 'reflective',
  },
  {
    id: '4',
    date: '2024-11-10',
    title: 'Hackathon Victory!',
    content: `Our team won the Code-Zen hackathon! I developed the official website for the event, and it was amazing to see it being used by hundreds of participants. The event was a huge success, and I got to network with so many talented developers. This experience has definitely boosted my confidence.`,
    mood: 'happy',
  },
  {
    id: '5',
    date: '2024-10-05',
    title: 'Learning Vapi AI',
    content: `Spent the weekend diving deep into Vapi AI for voice automation. The integration with n8n workflows is fascinating. Built a prototype for automated interview scheduling and it's working better than expected. AI is definitely the future, and I'm glad I'm getting hands-on experience with it.`,
    mood: 'productive',
  },
  {
    id: '6',
    date: '2024-09-15',
    title: 'Challenging Week',
    content: `This week was tough. Had to debug a complex issue with WebSocket connections in the VideoTube project. The mood-based recommendation system using Gemini AI was acting up. After three days of debugging, finally found the issue - a race condition in the state management. Fixed it and learned a lot about async patterns.`,
    mood: 'challenging',
  },
  {
    id: '7',
    date: '2024-08-20',
    title: 'Started at IISDRPP',
    content: `Began my internship at the International Institute of SDGs and Public Policy Research. Working on an Intern Management Portal using the MERN stack. The challenge here is implementing role-based access control and performance tracking. Excited to make this a comprehensive solution.`,
    mood: 'excited',
  },
  {
    id: '8',
    date: '2024-07-10',
    title: 'Web Development Lead',
    content: `Officially became the Web Development Lead at Code Geeks, the coding society of GTB4CEC. It's a big responsibility but I'm ready for it. Planning workshops on React, Node.js, and cloud deployment. Want to help juniors avoid the mistakes I made when starting out.`,
    mood: 'happy',
  },
];

const moodIcons = {
  happy: Smile,
  productive: Zap,
  reflective: BookOpen,
  excited: Sun,
  challenging: CloudRain,
};

const moodColors = {
  happy: '#34c759',
  productive: '#007aff',
  reflective: '#af52de',
  excited: '#ff9500',
  challenging: '#ff3b30',
};

export default function Journal({ isDark }: JournalProps) {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = JOURNAL_ENTRIES.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`w-full h-full flex ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      {/* Sidebar - Entry List */}
      <div className={`w-80 flex-shrink-0 border-r ${
        isDark ? 'border-white/10 bg-[#1e1e1e]' : 'border-black/10 bg-white'
      }`}>
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Journal
            </h2>
            <button className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
            }`}>
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isDark ? 'bg-white/10' : 'bg-black/10'
          }`}>
            <Search className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-black/40'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
              className={`flex-1 bg-transparent outline-none text-sm ${
                isDark ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-black/40'
              }`}
            />
          </div>
        </div>

        {/* Entry List */}
        <div className="overflow-auto h-[calc(100%-100px)]">
          {filteredEntries.map((entry, index) => {
            const MoodIcon = moodIcons[entry.mood];
            const isSelected = selectedEntry?.id === entry.id;
            
            return (
              <motion.button
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedEntry(entry)}
                className={`w-full p-4 text-left border-b transition-all ${
                  isDark ? 'border-white/5' : 'border-black/5'
                } ${
                  isSelected
                    ? (isDark ? 'bg-white/10' : 'bg-black/5')
                    : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')
                }`}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${moodColors[entry.mood]}20` }}
                  >
                    <MoodIcon className="w-4 h-4" style={{ color: moodColors[entry.mood] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {entry.title}
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                      {formatDate(entry.date)}
                    </p>
                    <p className={`text-sm mt-2 line-clamp-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      {entry.content}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Content - Entry Detail */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {selectedEntry ? (
            <motion.div
              key={selectedEntry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8 max-w-3xl"
            >
              {/* Back button on mobile */}
              <button
                onClick={() => setSelectedEntry(null)}
                className={`md:hidden flex items-center gap-2 mb-4 text-sm ${
                  isDark ? 'text-white/60' : 'text-gray-500'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {/* Entry Header */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${moodColors[selectedEntry.mood]}20` }}
                >
                  {(() => {
                    const Icon = moodIcons[selectedEntry.mood];
                    return <Icon className="w-6 h-6" style={{ color: moodColors[selectedEntry.mood] }} />;
                  })()}
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedEntry.title}
                  </h1>
                  <div className={`flex items-center gap-2 mt-1 text-sm ${
                    isDark ? 'text-white/50' : 'text-gray-500'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedEntry.date)}
                  </div>
                </div>
              </div>

              {/* Entry Content */}
              <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                <p className={`text-lg leading-relaxed whitespace-pre-wrap ${
                  isDark ? 'text-white/80' : 'text-gray-700'
                }`}>
                  {selectedEntry.content}
                </p>
              </div>

              {/* Mood Tag */}
              <div className="mt-8">
                <span 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${moodColors[selectedEntry.mood]}20`,
                    color: moodColors[selectedEntry.mood]
                  }}
                >
                  {(() => {
                    const Icon = moodIcons[selectedEntry.mood];
                    return <Icon className="w-4 h-4" />;
                  })()}
                  Feeling {selectedEntry.mood}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center p-8"
            >
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${
                isDark ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <BookOpen className={`w-12 h-12 ${isDark ? 'text-white/30' : 'text-black/30'}`} />
              </div>
              <h3 className={`text-xl font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Select an entry to read
              </h3>
              <p className={`mt-2 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                {filteredEntries.length} entries in your journal
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
