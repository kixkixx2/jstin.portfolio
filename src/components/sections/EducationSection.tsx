import React from 'react';
import { PORTFOLIO_DATA, Certification } from '../../data/portfolioData';
import { Award, GraduationCap, Eye } from 'lucide-react';

interface EducationSectionProps {
  onSelectCert: (cert: Certification) => void;
  scrollProgress: number;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  onSelectCert,
  scrollProgress,
}) => {
  const { education } = PORTFOLIO_DATA;
  const parallaxX = (scrollProgress * 110).toFixed(1);

  return (
    <section
      id="education"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[900px] h-full flex flex-col justify-center px-6 sm:px-12 py-10 select-none"
    >
      {/* Background Section Index */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        05
      </div>

      <div className="relative z-10 max-w-5xl space-y-6">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="text-lime-600 dark:text-lime-400 font-semibold">05</span>
            <span aria-hidden="true">/</span>
            <span>ACADEMIC FOUNDATION</span>
            <span aria-hidden="true">·</span>
            <span>ISABELA STATE UNIVERSITY</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Academic Excellence & Honors
            </h2>
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              Click any certificate to inspect full resolution
            </p>
          </div>
        </div>

        {/* Degree & Honors Summary Strip */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-lime-600 dark:text-lime-400">
              <GraduationCap className="w-4 h-4" />
              <span>{education.degree}</span>
              <span aria-hidden="true">·</span>
              <span>{education.period}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
              {education.school}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-light">
              Specialized curriculum in <strong className="text-slate-900 dark:text-zinc-200">{education.major}</strong> covering algorithms, database mining, predictive modeling, and dimensional geometry.
            </p>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-lime-600 dark:text-lime-400 block font-semibold">
              Distinction Awarded
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-zinc-100 font-mono">
              {education.honors}
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              General Weighted Average: <span className="text-lime-600 dark:text-lime-400 font-semibold">{education.gwa}</span>
            </div>
          </div>
        </div>

        {/* Clickable Certifications Gallery */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            National Certifications & Commendations
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {education.certifications.map((cert) => (
              <div
                key={cert.id}
                onClick={() => onSelectCert(cert)}
                className="group p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-lime-500 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 shadow-sm hover:shadow"
              >
                <div className="space-y-2.5">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-500 ease-out grayscale-0 group-hover:grayscale group-hover:contrast-105 dark:grayscale dark:contrast-105 dark:group-hover:grayscale-0 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-slate-900 text-white flex-col items-center justify-center p-2 text-center">
                      <Award className="w-6 h-6 text-lime-400 opacity-60 mb-1" />
                      <span className="text-[10px] font-mono">{cert.issuer}</span>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-medium backdrop-blur-[2px]">
                      <Eye className="w-4 h-4 text-lime-400" />
                      <span>Inspect Credential</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-lime-600 dark:text-lime-400 block">{cert.date}</span>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2 mt-0.5">
                      {cert.title}
                    </h5>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] font-mono text-slate-500 dark:text-zinc-500 flex items-center justify-between">
                  <span className="truncate max-w-[130px]">{cert.issuer}</span>
                  <span className="text-lime-600 dark:text-lime-400">View ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
