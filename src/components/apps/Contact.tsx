import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Github, 
  Linkedin, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContactProps {
  isDark: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: 'Mail',
    label: 'Email',
    value: 'work.sudhanshukhosla@gmail.com',
    href: 'mailto:work.sudhanshukhosla@gmail.com',
  },
  {
    icon: 'MapPin',
    label: 'Location',
    value: 'Delhi, India',
    href: null,
  },
  {
    icon: 'Phone',
    label: 'Phone',
    value: '+91 8287036184',
    href: 'tel:+918287036184',
  },
];

const SOCIAL_LINKS = [
  { icon: 'Github', label: 'GitHub', url: 'https://github.com/Sudhanshu-khosla-26', color: '#333' },
  { icon: 'Linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/sudhanshu-khosla-a05b4a298', color: '#0077b5' },
];

const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    Mail, MapPin, Phone, Send, Github, Linkedin, CheckCircle, AlertCircle,
  };
  return icons[iconName] || Mail;
};

export function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className={`w-full h-full overflow-auto ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
          </h1>
          <p className={`mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 space-y-4"
          >
            {CONTACT_INFO.map((item) => {
              const Icon = getIconComponent(item.icon);
              const content = (
                <div
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    isDark ? 'bg-[#1e1e1e]' : 'bg-white'
                  }`}
                  style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDark ? 'bg-[#007aff]/20' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${isDark ? 'text-[#007aff]' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                      {item.label}
                    </p>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            {/* Social Links */}
            <div 
              className={`p-4 rounded-xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}
              style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <p className={`text-sm mb-3 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                Follow me
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = getIconComponent(social.icon);
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isDark 
                          ? 'bg-white/10 hover:bg-white/20' 
                          : 'bg-black/10 hover:bg-black/20'
                      }`}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" style={{ color: social.color }} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div 
              className={`p-4 rounded-xl ${
                isDark ? 'bg-[#34c759]/10' : 'bg-green-50'
              }`}
              style={{ border: `1px solid ${isDark ? 'rgba(52,199,89,0.2)' : 'rgba(52,199,89,0.2)'}` }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#34c759] animate-pulse" />
                <span className={`font-medium ${isDark ? 'text-[#34c759]' : 'text-green-600'}`}>
                  Available for work
                </span>
              </div>
              <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                Currently accepting new projects and internship opportunities
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className={`p-6 rounded-xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}
              style={{ border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${
                      isDark 
                        ? 'bg-white/10 text-white placeholder:text-white/40 focus:bg-white/15 focus:ring-2 focus:ring-[#007aff]' 
                        : 'bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${
                      isDark 
                        ? 'bg-white/10 text-white placeholder:text-white/40 focus:bg-white/15 focus:ring-2 focus:ring-[#007aff]' 
                        : 'bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mt-4">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${
                    isDark 
                      ? 'bg-white/10 text-white placeholder:text-white/40 focus:bg-white/15 focus:ring-2 focus:ring-[#007aff]' 
                      : 'bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500'
                  }`}
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div className="mt-4">
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-white/70' : 'text-gray-700'
                }`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg outline-none transition-all resize-none ${
                    isDark 
                      ? 'bg-white/10 text-white placeholder:text-white/40 focus:bg-white/15 focus:ring-2 focus:ring-[#007aff]' 
                      : 'bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:opacity-90'
                } bg-[#007aff] text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                    isDark ? 'bg-[#34c759]/20 text-[#34c759]' : 'bg-green-100 text-green-700'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                    isDark ? 'bg-[#ff3b30]/20 text-[#ff3b30]' : 'bg-red-100 text-red-700'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
