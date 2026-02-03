import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  Link as LinkIcon,
} from "lucide-react";

interface ResumeProps {
  isDark: boolean;
}

const RESUME_DATA = [
  {
    id: "summary",
    title: "Executive Summary",
    type: "text",
    content:
      "Full Stack Developer specializing in scalable web architectures and AI-driven automation[cite: 1, 2]. Proven track record in developing high-performance recruitment platforms and real-time deployment systems using modern tech stacks[cite: 1, 2]. Focused on technical excellence, collaborative development, and delivering user-centric solutions[cite: 1, 2].",
  },
  {
    id: "education",
    title: "Education",
    type: "list",
    items: [
      {
        heading: "Guru Tegh Bahadur 4th Centenary Engineering College",
        subHeading: "B.Tech in Computer Science Engineering | CGPA: 8.2",
        period: "Pursuing ",
        location: "GGSIPU, Delhi ",
      },
      {
        heading: "Tagore Senior Secondary School",
        subHeading: "12th Grade - Science Stream | Percentage: 81%",
        period: "May 2023 ",
        location: "CBSE Board, Delhi ",
      },
    ],
  },
  {
    id: "skills",
    title: "Core Competencies",
    type: "skills",
    categories: [
      {
        label: "Languages",
        value: "JavaScript, Python, Java, SQL, PHP, C/C++ ",
      },
      {
        label: "Frontend & UI",
        value: "React.js, Next.js, Redux Toolkit, Tailwind CSS, HTML5, CSS3 ",
      },
      { label: "Backend", value: "Node.js, Express.js, Prisma, WebSockets " },
      {
        label: "DevOps & Cloud",
        value: "AWS (EC2, S3, ECR, ECS), Docker, Nginx, GitHub CI/CD ",
      },
      {
        label: "Data & Messaging",
        value:
          "PostgreSQL, MongoDB, Redis, Apache Kafka, ClickHouse, Pinecone ",
      },
      {
        label: "AI & Automation",
        value: "Vapi AI, RAG, n8n, LLM API Integration, Machine Learning ",
      },
    ],
  },
  {
    id: "experience",
    title: "Professional Experience",
    type: "list",
    items: [
      {
        heading: "Full Stack Developer Intern",
        subHeading: "Nitya Consulting Services",
        period: "Aug 2025 – Nov 2025 ",
        location: "Remote ",
        bullets: [
          "Engineered AI recruitment platforms using Next.js for automated candidate screening and JD relevance scoring.",
          "Implemented automated 3D AI agent interviews (Vapi) with structured evaluation, reducing manual screening by 60%.",
          "Architected real estate automation workflows via n8n and Vapi AI, improving operational efficiency by 50%.",
          "Designed robust database schemas and ER diagrams supporting internal and external application scale.",
        ],
      },
      {
        heading: "Full Stack Developer Intern",
        subHeading:
          "International Institute of SDGs and Public Policy Research",
        period: "Apr 2025 – May 2025 ",
        location: "Remote ",
        bullets: [
          "Developed an Intern Management Portal (MERN) facilitating seamless interaction between HRs, Admins, and Interns.",
          "Integrated real-time attendance tracking, batch creation, and performance-based ranking systems.",
          "Built role-based access control (RBAC) and permissioned task review workflows.",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Strategic Projects",
    type: "list",
    items: [
      {
        heading: "DeployHub",
        subHeading:
          "Infrastructure: AWS (ECS, ECR, S3), Kafka, PostgreSQL, ClickHouse, Prisma",
        period: "Production Project ",
        bullets: [
          "Developed one-click deployment infrastructure with real-time Kafka log tracking and subdomain access.",
          "Implemented ClickHouse analytics for high-performance status tracking and deployment monitoring.",
        ],
      },
      {
        heading: "Video Tube",
        subHeading:
          "Tech: React.js, Node.js, Express.js, MongoDB, Gemini AI, Cloudinary",
        period: "Personal Project ",
        bullets: [
          "Integrated Gemini AI for mood-based video recommendations and interactive user features.",
          "Optimized asset delivery and load times through Cloudinary media management.",
        ],
      },
    ],
  },
  {
    id: "achievements",
    title: "Leadership & Impact",
    type: "bullets",
    bullets: [
      "Web Development Lead at Code Geeks, directing technical initiatives for the official college coding society.",
      "Lead Developer for Code-Zen Hackathon website, managing event-critical digital infrastructure.",
      "Student Coordinator for college Tech Fest, overseeing full-lifecycle event organization and execution.",
    ],
  },
];

export function Resume({ isDark }: ResumeProps) {
  return (
    <div
      className={`w-full h-full overflow-auto pb-20 selection:bg-blue-500/30 ${isDark ? "bg-[#0a0a0a] text-gray-300" : "bg-white text-gray-800"}`}
    >
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Senior-Level Header: Clean, Typography-focused */}
        <header className="mb-12 border-b border-current/10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1
                className={`text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Sudhanshu Khosla
              </h1>
              <p className="text-xl mt-2 font-medium text-blue-600">
                Full Stack Developer{" "}
              </p>
            </div>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded border border-current/20 hover:bg-current/5 transition-colors text-sm font-semibold`}
            >
              <Download className="w-4 h-4" /> Download Resume
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 mt-8 text-sm opacity-80">
            <a
              href="mailto:work.sudhanshukhosla@gmail.com"
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <Mail className="w-4 h-4" /> work.sudhanshukhosla@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 8287036184{" "}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Delhi, India{" "}
            </div>
            <a
              href="https://linkedin.com/in/sudhanshu-khosla-a05b4a298"
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />{" "}
              linkedin.com/in/sudhanshu-khosla...
            </a>
            <a
              href="https://github.com/Sudhanshu-khosla-26"
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <Github className="w-4 h-4" /> github.com/Sudhanshu-khosla-26
            </a>
          </div>
        </header>

        {/* Structured Sections */}
        <div className="space-y-12">
          {RESUME_DATA.map((section) => (
            <section
              key={section.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10"
            >
              <div className="md:col-span-1">
                <h3
                  className={`text-xs font-bold uppercase tracking-[0.2em] sticky top-12 ${isDark ? "text-white/40" : "text-gray-400"}`}
                >
                  {section.title}
                </h3>
              </div>

              <div className="md:col-span-3">
                {section.type === "text" && (
                  <p className="leading-relaxed text-[15px]">
                    {section.content}
                  </p>
                )}

                {section.type === "list" && (
                  <div className="space-y-8">
                    {section.items?.map((item, i) => (
                      <div key={i}>
                        <div className="flex flex-col md:flex-row justify-between items-baseline mb-1">
                          <h4
                            className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
                          >
                            {item.heading}
                          </h4>
                          <span className="text-xs font-mono opacity-50">
                            {item.period}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-[15px] font-semibold text-blue-600">
                            {item.subHeading}
                          </p>
                          <span className="text-xs opacity-50 italic">
                            {item.location}
                          </span>
                        </div>
                        {item.bullets && (
                          <ul className="space-y-2">
                            {item.bullets.map((bullet, j) => (
                              <li
                                key={j}
                                className="text-[14px] leading-relaxed flex gap-3 opacity-90"
                              >
                                <span className="mt-2 w-1.5 h-[1.5px] bg-current opacity-40 flex-shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "skills" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {section.categories?.map((cat, i) => (
                      <div key={i} className="group">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-white/20" : "text-gray-400"}`}
                        >
                          {cat.label}
                        </span>
                        <p
                          className={`text-sm mt-2 leading-relaxed ${isDark ? "text-white/90" : "text-gray-800"}`}
                        >
                          {cat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "bullets" && (
                  <ul className="space-y-4">
                    {section.bullets?.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-[14px] flex gap-3 items-center group"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500/70 group-hover:text-green-500 transition-colors" />
                        <span className="opacity-90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
