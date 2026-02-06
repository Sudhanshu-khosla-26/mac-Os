import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
} from "lucide-react";

/* =========================
   Types
========================= */

interface ResumeProps {
  isDark: boolean;
}

type ResumeListItem = {
  heading: string;
  subHeading: string;
  period: string;
  location?: string;
  bullets?: string[];
};

type ResumeSection =
  | {
      id: string;
      title: string;
      type: "text";
      content: string;
    }
  | {
      id: string;
      title: string;
      type: "list";
      items: ResumeListItem[];
    }
  | {
      id: string;
      title: string;
      type: "skills";
      categories: { label: string; value: string }[];
    }
  | {
      id: string;
      title: string;
      type: "bullets";
      bullets: string[];
    };

/* =========================
   Resume Data
========================= */

const RESUME_DATA: ResumeSection[] = [
  {
    id: "summary",
    title: "Executive Summary",
    type: "text",
    content:
      "Full Stack Developer specializing in scalable web architectures and AI-driven automation. Proven track record in developing high-performance recruitment platforms and real-time deployment systems using modern tech stacks. Focused on technical excellence, collaborative development, and delivering user-centric solutions.",
  },
  {
    id: "education",
    title: "Education",
    type: "list",
    items: [
      {
        heading: "Guru Tegh Bahadur 4th Centenary Engineering College",
        subHeading: "B.Tech in Computer Science Engineering | CGPA: 8.2",
        period: "2022 – 2026",
        location: "GGSIPU, Delhi",
      },
      {
        heading: "Tagore Senior Secondary School",
        subHeading: "12th Grade – Science Stream | Percentage: 81%",
        period: "May 2023",
        location: "CBSE Board, Delhi",
      },
    ],
  },
  {
    id: "skills",
    title: "Core Competencies",
    type: "skills",
    categories: [
      { label: "Languages", value: "JavaScript, Python, Java, SQL, C/C++" },
      {
        label: "Frontend & UI",
        value: "React.js, Next.js, Redux Toolkit, Tailwind CSS",
      },
      {
        label: "Backend",
        value: "Node.js, Express.js, Prisma, WebSockets",
      },
      {
        label: "DevOps & Cloud",
        value: "AWS (EC2, S3, ECR, ECS), Docker, Nginx",
      },
      {
        label: "Data & Messaging",
        value: "PostgreSQL, MongoDB, Redis, Kafka, ClickHouse",
      },
      {
        label: "AI & Automation",
        value: "Vapi AI, RAG, n8n, LLM API Integration",
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
        period: "Aug 2025 – Nov 2025",
        location: "Remote",
        bullets: [
          "Engineered AI recruitment platforms using Next.js for automated candidate screening.",
          "Implemented AI-driven interviews using Vapi, reducing manual screening by 60%.",
          "Designed scalable database schemas and ER diagrams.",
        ],
      },
      {
        heading: "Full Stack Developer Intern",
        subHeading:
          "International Institute of SDGs and Public Policy Research",
        period: "Apr 2025 – May 2025",
        location: "Remote",
        bullets: [
          "Developed MERN-based Intern Management Portal.",
          "Implemented role-based access control (RBAC).",
          "Integrated real-time attendance and ranking systems.",
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
        subHeading: "AWS (ECS, ECR, S3), Kafka, PostgreSQL, ClickHouse, Prisma",
        period: "Production Project",
        bullets: [
          "Built one-click deployment platform with real-time Kafka logs.",
          "Implemented ClickHouse analytics for deployment monitoring.",
        ],
      },
      {
        heading: "VideoTube",
        subHeading: "React, Node.js, Express, MongoDB, Gemini AI, Cloudinary",
        period: "Personal Project",
        bullets: [
          "Integrated AI-based mood-driven video recommendations.",
          "Optimized media delivery using Cloudinary.",
        ],
      },
    ],
  },
  {
    id: "achievements",
    title: "Leadership & Impact",
    type: "bullets",
    bullets: [
      "Web Development Lead at Code Geeks society.",
      "Lead Developer for Code-Zen Hackathon website.",
      "Student Coordinator for college Tech Fest.",
    ],
  },
];

/* =========================
   Component
========================= */

export function Resume({ isDark }: ResumeProps) {
  return (
    <div
      className={`w-full h-full overflow-auto pb-20 ${
        isDark ? "bg-[#0a0a0a] text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Header */}
        <header className="mb-12 border-b border-current/10 pb-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold">Sudhanshu Khosla</h1>
              <p className="text-xl mt-2 font-medium text-blue-600">
                Full Stack Developer
              </p>
            </div>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/SUDHANSHU-KHOSLA-RESUME.pdf";
                link.download = "Sudhanshu_Khosla_Resume.pdf";
                link.click();
              }}
              className="flex items-center h-fit w-fit gap-2 px-4 py-2 border rounded-lg  text-sm font-semibold"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 mt-8 text-sm opacity-80">
            <a
              href="mailto:work.sudhanshukhosla@gmail.com"
              className="flex gap-2"
            >
              <Mail className="w-4 h-4" />
              work.sudhanshukhosla@gmail.com
            </a>
            <div className="flex gap-2">
              <Phone className="w-4 h-4" />
              +91 8287036184
            </div>
            <div className="flex gap-2">
              <MapPin className="w-4 h-4" />
              Delhi, India
            </div>
            <a href="https://linkedin.com" className="flex gap-2 text-blue-500">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="https://github.com" className="flex gap-2 text-blue-500">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {RESUME_DATA.map((section) => (
            <section
              key={section.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-50">
                {section.title}
              </h3>

              <div className="md:col-span-3">
                {section.type === "text" && (
                  <p className="leading-relaxed">{section.content}</p>
                )}

                {section.type === "list" &&
                  section.items.map((item, i) => (
                    <div key={i} className="mb-8">
                      <div className="flex justify-between">
                        <h4 className="font-bold">{item.heading}</h4>
                        <span className="text-xs opacity-50">
                          {item.period}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <p className="text-blue-600 font-semibold">
                          {item.subHeading}
                        </p>
                        {item.location && (
                          <span className="text-xs italic opacity-50">
                            {item.location}
                          </span>
                        )}
                      </div>
                      {item.bullets && (
                        <ul className="space-y-2">
                          {item.bullets.map((bullet, j) => (
                            <li key={j} className="flex gap-3 text-sm">
                              <span className="w-1.5 h-1.5 mt-2 bg-current rounded-full opacity-40" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                {section.type === "skills" &&
                  section.categories.map((cat, i) => (
                    <div key={i} className="mb-6">
                      <p className="text-xs uppercase opacity-50">
                        {cat.label}
                      </p>
                      <p>{cat.value}</p>
                    </div>
                  ))}

                {section.type === "bullets" && (
                  <ul className="space-y-3">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {bullet}
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
