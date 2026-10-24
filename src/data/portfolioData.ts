export interface Project {
  id: string;
  title: string;
  category: 'Academic' | 'Commercial' | 'Personal';
  categoryLabel: string;
  date: string;
  image: string;
  gallery?: string[];
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId?: string;
  description: string;
}

export interface PortfolioVersion {
  version: string;
  title: string;
  codename: string;
  url: string;
  period: string;
  aesthetic: string;
  description: string;
  features: string[];
  techStack: string[];
  previewImage: string;
  strengths: string;
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'APIs & Databases' | 'Data Science & ML' | 'Automation & Tools';
  role: string;
  badge: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Jastin Lamug",
    preferredName: "jstn",
    handle: "kixkixx2",
    tagline: "Web Developer · Isabela, Philippines · Computer Science (Cum Laude)",
    shortBio: "Web developer and computer science graduate (Cum Laude) from Isabela State University. Combining real human intelligence with artificial intelligence to engineer clean web applications and intelligent systems.",
    extendedBio: "I am a web developer and computer science graduate from Isabela State University, graduated Cum Laude, with knowledge and a bit of experience in software development. My engineering approach combines real intelligence with artificial intelligence (AI). I believe that AI cannot replace real human intelligence—but humans who leverage AI will outpace those who don’t, and I myself actively use AI.",
    email: "jastinlamug26@gmail.com",
    backupEmail: "fanglamug26@gmail.com",
    github: "https://github.com/kixkixx2",
    linkedin: "https://www.linkedin.com/in/jastin-lamug-0253253a4",
    facebook: "https://www.facebook.com/masterjastin.26/",
    location: "Isabela, Philippines",
    status: "Available for Web Development & Engineering Roles",
    images: {
      profile: \"assets/v2/profile.jpg",
      about: \"assets/v1/about.jpg",
      full: \"assets/jastin_full.jpg",
    },
    metrics: [
      { label: "Academic Standing", value: "Cum Laude", subtext: "GWA 1.518" },
      { label: "Core Focus", value: "Web Dev", subtext: "Frontend & Full-Stack" },
      { label: "Core Systems", value: "5 Projects", subtext: "1 Academic · 2 Commercial · 2 Personal" },
      { label: "Certifications", value: "3 National", subtext: "Civil Service & Honors" },
    ]
  },

  projects: [
    {
      id: "kumap",
      title: "K-UMAP Health Analytics",
      category: "Academic" as const,
      categoryLabel: "Academic · Thesis Project",
      date: "Dec 2025",
      image: \"assets/projects/k-umap/k1.png",
      gallery: [
        \"assets/projects/k-umap/k1.png",
        \"assets/projects/k-umap/k2.png",
        \"assets/projects/k-umap/k3.png",
      ],
      featured: true,
      summary: "Enhanced dimensional reduction and clustering pipeline designed for institutional student health records.",
      description: "A dual-algorithmic machine learning pipeline built for the Isabela State University Echague Infirmary. Combines UMAP (Uniform Manifold Approximation and Projection) for non-linear dimensionality preservation with K-Means clustering to discover latent health risk patterns and segment student medical cohorts.",
      stack: ["Python", "Flask", "Scikit-Learn", "UMAP-learn", "Pandas", "NumPy", "Optuna", "Gunicorn", "Render"],
      features: [
        "Interactive 2D/3D projection preserving both local neighborhood structures and global clusters",
        "Automated K-Means hyperparameter optimization using silhouette scores and Davies-Bouldin index",
        "RESTful Flask backend serving inference coordinates to real-time client visualizations",
        "Targeted clinical insights aiding university health personnel in preventative student care"
      ],
      link: "https://k-umap.onrender.com/",
    },
    {
      id: "qms",
      title: "Queue Management System (DMW / OWWA)",
      category: "Commercial" as const,
      categoryLabel: "Commercial · Field Deployment",
      date: "Feb 2026",
      image: \"assets/projects/queue system/1.png",
      gallery: [
        \"assets/projects/queue system/1.png",
        \"assets/projects/queue system/2.png",
        \"assets/projects/queue system/3.png",
        \"assets/projects/queue system/4.png",
        \"assets/projects/queue system/5.png",
        \"assets/projects/queue system/6.png",
        \"assets/projects/queue system/7.png",
      ],
      featured: true,
      summary: "Standalone offline-resilient queuing architecture built for joint governmental migrant worker facilities.",
      description: "Engineered and deployed a standalone, local-network paperless queue system connecting intake kiosks, officer desks, administration monitors, and digital calling boards over Socket.IO and SQLite to protect sensitive migrant client data without depending on cloud uptime.",
      stack: ["Node.js", "Express", "Socket.IO", "SQLite", "JavaScript", "HTML5", "CSS3", "Local Area Network"],
      features: [
        "Zero-cloud offline dependency protecting overseas worker personally identifiable information",
        "Sub-millisecond WebSocket updates synchronizing 5 distinct physical stations and display monitors",
        "Automated client routing between DMW documentation counters and OWWA welfare services",
        "Auditable transaction logs and daily throughput reporting for office supervisors"
      ],
      github: "https://github.com/kixkixx2/q-system",
    },
    {
      id: "jplamug",
      title: "J.P. Lamug-Daquioag Clinic Website",
      category: "Commercial" as const,
      categoryLabel: "Commercial · Client Portal",
      date: "Sept 2026",
      image: \"assets/projects/j.p lamug/web.png",
      gallery: [
        \"assets/projects/j.p lamug/web.png",
      ],
      featured: false,
      summary: "Official patient portal and healthcare clinic web presence for specialized OB-GYNE practice in San Agustin, Isabela.",
      description: "Full clinic web portal designed and deployed for J.P. Lamug-Daquioag OB-GYNE Clinic. Features service catalogs, practitioner credentials, patient inquiry management, and clinic schedule discovery.",
      stack: ["TypeScript", "React", "Tailwind CSS", "API Integration", "Vercel"],
      features: [
        "Modern responsive patient-facing UI optimized for mobile speed and low-bandwidth connections",
        "Structured healthcare service directory covering maternal care, ultrasound, and consultations",
        "Integrated appointment inquiry flow and patient guidance documentation",
        "High-accessibility color palette and accessible typography for expectant mothers"
      ],
      link: "https://j-p-lamug-daquioag.vercel.app/",
    },
    {
      id: "automation",
      title: "Stock Market News Intelligence Analyzer",
      category: "Personal" as const,
      categoryLabel: "Personal · Automation Project",
      date: "Aug 2026",
      image: \"assets/projects/stock market/a1.png",
      gallery: [
        \"assets/projects/stock market/a1.png",
        \"assets/projects/stock market/a2.png",
        \"assets/projects/stock market/a3.png",
        \"assets/projects/stock market/a4.png",
        \"assets/projects/stock market/a5.png",
      ],
      featured: false,
      summary: "Automated multi-source financial news aggregator and AI sentiment analyzer with webhook dispatch.",
      description: "An automated workflow pipeline built on n8n that continuously ingests financial news feeds, extracts sentiment and material market developments using Google Gemini AI, and routes high-conviction market signals to Discord webhooks with zero manual intervention.",
      stack: ["n8n", "Google Gemini AI", "RSS Feeds", "Discord Webhooks", "REST APIs", "JavaScript", "JSON", "Cron"],
      features: [
        "Multi-feed RSS polling with duplicate article deduplication and content sanitation",
        "AI-driven summary extraction and high-impact catalyst tagging using Gemini LLM",
        "Custom rich embed formatting dispatched directly to private analytical channels",
        "Configurable trigger frequencies and market-hours conditional scheduling"
      ],
    },
    {
      id: "gmail-sig",
      title: "Gmail Signature Generator Studio",
      category: "Personal" as const,
      categoryLabel: "Personal · Web Tool",
      date: "2026",
      image: \"assets/projects/gmail signature/g1.png",
      gallery: [
        \"assets/projects/gmail signature/g1.png",
        \"assets/projects/gmail signature/g2.png",
      ],
      featured: false,
      summary: "Interactive email signature designer and HTML generator studio tailored for creative professionals.",
      description: "A fast, client-side web application allowing developers and professionals to configure, live-preview, and generate responsive, cross-client HTML email signatures with social badges, disclaimers, and one-click clipboard copying.",
      stack: ["React", "TypeScript", "Tailwind CSS", "HTML5 Canvas", "Vite", "GitHub Pages"],
      features: [
        "Real-time signature rendering supporting multiple layouts, typography styles, and brand palettes",
        "Single-click rich-HTML and raw HTML clipboard export compatible with Gmail, Apple Mail, and Outlook",
        "Integrated badge generators for GitHub, LinkedIn, portfolios, and contact channels",
        "Zero backend dependencies running completely client-side in the browser"
      ],
      link: "https://kixkixx2.github.io/gmail.sig.generator/",
    }
  ],

  education: {
    degree: "Bachelor of Science in Computer Science",
    major: "Major in Data Mining",
    school: "Isabela State University — Echague Main Campus",
    honors: "Cum Laude",
    gwa: "1.518",
    period: "2022 – 2026",
    summary: "Graduated with Latin honors specializing in machine learning, high-dimensional data analysis, pattern recognition, and algorithm design.",
    certifications: [
      {
        id: "honor-grad",
        title: "Honor Graduate Eligibility — Cum Laude (PD 907)",
        issuer: "Civil Service Commission (Republic of the Philippines)",
        date: "July 2026",
        image: \"assets/cert/honor_graduate.jpg",
        description: "Official civil service professional eligibility granted under Presidential Decree No. 907 to honor graduates of state universities."
      },
      {
        id: "accenture",
        title: "Accenture Technology Academy — Salesforce Track",
        issuer: "Accenture",
        date: "Feb 2026 – Apr 2026",
        image: \"assets/cert/accenture.png",
        description: "Specialized enterprise training on enterprise architecture, cloud solutions, and Salesforce development principles."
      },
      {
        id: "civil-service",
        title: "Civil Service Eligible — Professional Level",
        issuer: "Civil Service Commission",
        date: "March 2024",
        image: \"assets/cert/eligibility.jpg",
        description: "Passed Career Service Professional Examination demonstrating top-tier analytical and language proficiency."
      },
      {
        id: "recognition",
        title: "Academic Recognition Certificate — Cum Laude",
        issuer: "Isabela State University",
        date: "July 2026",
        image: \"assets/cert/recognition.jpg",
        description: "Commendation for exemplary academic excellence throughout the BSCS curriculum."
      }
    ]
  },

  skills: [
    { name: "Python", category: "Backend", role: "Scripting, ML pipelines & backend services", badge: "Language / Backend" },
    { name: "JavaScript", category: "Frontend", role: "Modern ESNext & DOM interactivity", badge: "Language / Web" },
    { name: "TypeScript", category: "Frontend", role: "Strict type safety & scalable apps", badge: "Language / Strict" },
    { name: "React", category: "Frontend", role: "Component architecture & reactive state", badge: "Frontend UI" },
    { name: "Vite", category: "Frontend", role: "Lightning-fast tooling & bundling", badge: "Build Tool" },
    { name: "Tailwind CSS", category: "Frontend", role: "Utility-first design systems", badge: "CSS / Styling" },
    { name: "Flask", category: "Backend", role: "Python microservices & REST APIs", badge: "Backend / Py" },
    { name: "Node.js", category: "Backend", role: "Server-side runtime & WebSockets", badge: "Runtime / Backend" },
    { name: "REST APIs", category: "APIs & Databases", role: "Contract design & endpoint integration", badge: "API Protocol" },
    { name: "Firebase", category: "APIs & Databases", role: "BaaS, auth & real-time sync", badge: "BaaS / Cloud" },
    { name: "Firestore", category: "APIs & Databases", role: "NoSQL document collections", badge: "NoSQL DB" },
    { name: "SQLite", category: "APIs & Databases", role: "Embedded offline-first zero-cloud DB", badge: "Embedded DB" },
    { name: "SQL", category: "APIs & Databases", role: "Relational queries, indexes & schemas", badge: "Relational DB" },
    { name: "Pandas", category: "Data Science & ML", role: "Data cleaning, transformation & frames", badge: "Data Science" },
    { name: "NumPy", category: "Data Science & ML", role: "Vectorized linear algebra & arrays", badge: "Numerical Math" },
    { name: "Scikit-learn", category: "Data Science & ML", role: "Clustering, classifiers & pipelines", badge: "Machine Learning" },
    { name: "UMAP", category: "Data Science & ML", role: "High-dimensional manifold projection", badge: "Manifold / ML" },
    { name: "K-Means", category: "Data Science & ML", role: "Centroid vector clustering & partitioning", badge: "Clustering / ML" },
    { name: "n8n", category: "Automation & Tools", role: "Event-driven workflow orchestration", badge: "Workflow Engine" },
    { name: "Git", category: "Automation & Tools", role: "Distributed branch & version control", badge: "Version Control" },
  ] as SkillItem[],

  versions: [
    {
      version: "v1.0",
      title: "Portfolio v1",
      codename: "v1",
      url: "https://kixkixx2.github.io/portfolio/index.html",
      period: "2025 – Early 2026",
      aesthetic: "Futuristic dark mode with interactive 3D CSS polyhedra, interactive particle canvas, tilt cards, and simulated terminal emulator.",
      description: "Original creative build featuring interactive 3D CSS polyhedra, HTML5 particle canvas physics, and a retro interactive bash terminal script.",
      features: [
        "Interactive HTML5 Particle Canvas background reacting to pointer physics",
        "3D CSS floating polyhedra (cubes, pyramids, rings, spheres) rotating on independent axes",
        "Hologram-style portrait frame with corner accents and card tilt",
        "Interactive Bash-style terminal widget (`contact.sh`) echoing commands and contact info",
        "Glitched headline animations and 3D gradient text"
      ],
      techStack: ["HTML5", "CSS3 3D Transforms", "JavaScript", "Canvas API", "Font Awesome"],
      previewImage: \"assets/v1/about.jpg",
      strengths: "Playful creative flair, tactile 3D CSS math, and developer aesthetic."
    },
    {
      version: "v2.0",
      title: "Portfolio v2",
      codename: "v2",
      url: "https://kixkixx2.github.io/jastin-s-portfolio-v1/",
      period: "Mid 2026",
      aesthetic: "Crisp black-and-white monograph with electric lime accents, modal drawer details, and a high-resolution certificate gallery.",
      description: "Second edition built with React 19 and Vite, focusing on clean editorial typography, interactive drawer modals, and academic credential showcases.",
      features: [
        "Clean oversized typographic grid with electric lime (`#a3e635`) focal accents",
        "Interactive project cards expanding into focused detail sheets",
        "Dedicated experience timeline for the DMW/OWWA internship",
        "High-resolution academic certificate viewer for Cum Laude honors and Civil Service",
        "Integrated conversation assistant for visitor Q&A"
      ],
      techStack: ["React 19", "Vite", "Tailwind CSS", "Motion", "TypeScript"],
      previewImage: \"assets/v2/profile.jpg",
      strengths: "Streamlined readability, clean certificate verification, and modern component architecture."
    }
  ]
};
