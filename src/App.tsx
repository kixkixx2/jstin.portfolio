import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Header } from './components/Header';
import { HorizontalScroller } from './components/HorizontalScroller';
import { IntroSection } from './components/sections/IntroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { VersionArchiveSection } from './components/sections/VersionArchiveSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectModal } from './components/modals/ProjectModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { PORTFOLIO_DATA, Project, Certification } from './data/portfolioData';
import { scrollToSectionInContainer } from './layout';

const SECTIONS = [
  { id: 'intro', label: 'Intro', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'projects', label: 'Works', number: '03' },
  { id: 'education', label: 'Education', number: '04' },
  { id: 'skills', label: 'Skills', number: '05' },
  { id: 'archive', label: 'Archives', number: '06' },
  { id: 'contact', label: 'Contact', number: '07' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Initialize theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('jstn_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Sync theme with HTML class and storage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('jstn_theme', theme);
  }, [theme]);

  // Smooth circular reveal animation starting directly from the button
  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Modern View Transitions API with React flushSync
    if (typeof document.startViewTransition === 'function') {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
          document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        });
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      // GPU-accelerated circular clip-path overlay fallback
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '99999';
      overlay.style.pointerEvents = 'none';
      overlay.style.backgroundColor = nextTheme === 'dark' ? '#09090b' : '#f8fafc';
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      const anim = overlay.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${endRadius}px at ${x}px ${y}px)` },
        ],
        {
          duration: 450,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
          fill: 'forwards',
        }
      );

      anim.onfinish = () => {
        setTheme(nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        requestAnimationFrame(() => {
          overlay.remove();
        });
      };
    }
  };

  const handleNavigate = (index: number) => {
    setActiveSection(index);
    const targetSection = SECTIONS[index];
    if (!targetSection) return;
    const el = document.getElementById(targetSection.id);
    if (!el) return;

    const container = el.parentElement;
    if (container) {
      scrollToSectionInContainer(container, el);
    }
  };

  return (
    <div className={`min-h-screen ${theme} font-sans selection:bg-lime-400 selection:text-zinc-950`}>
      {/* Sticky Top Header adhering to Top Bar Contract */}
      <Header
        activeSection={activeSection}
        sections={SECTIONS}
        onNavigate={handleNavigate}
        onOpenVersions={() => handleNavigate(5)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Horizontal Panoramic Canvas */}
      <HorizontalScroller
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={SECTIONS}
        onScrollProgressChange={setScrollProgress}
        theme={theme}
      >
        <IntroSection
          onExploreProjects={() => handleNavigate(2)}
          onNavigateToContact={() => handleNavigate(6)}
          scrollProgress={scrollProgress}
        />

        <AboutSection scrollProgress={scrollProgress} />

        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          scrollProgress={scrollProgress}
        />

        <EducationSection
          onSelectCert={(cert) => setSelectedCert(cert)}
          scrollProgress={scrollProgress}
        />

        <SkillsSection scrollProgress={scrollProgress} />

        <VersionArchiveSection
          scrollProgress={scrollProgress}
          theme={theme}
        />

        <ContactSection scrollProgress={scrollProgress} />
      </HorizontalScroller>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        cert={selectedCert}
        allCerts={PORTFOLIO_DATA.education.certifications}
        onClose={() => setSelectedCert(null)}
        onSelectCert={(cert) => setSelectedCert(cert)}
      />
    </div>
  );
}
