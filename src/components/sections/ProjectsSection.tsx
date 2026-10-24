import React, { useState } from 'react';
import { ArrowUpRight, Star, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  scrollProgress: number;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  scrollProgress,
}) => {
  const { projects } = PORTFOLIO_DATA;
  const [filter, setFilter] = useState<'All' | 'Academic' | 'Commercial' | 'Personal'>('All');
  const parallaxX = (scrollProgress * 80).toFixed(1);

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[1100px] h-full flex flex-col justify-center px-6 sm:px-12 py-8 select-none"
    >
      {/* Background Section Index */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        03
      </div>

      <div className="relative z-10 space-y-5">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="text-lime-600 dark:text-lime-400 font-semibold">03</span>
            <span aria-hidden="true">/</span>
            <span>ENGINEERING & SYSTEMS</span>
            <span aria-hidden="true">·</span>
            <span>5 SELECTED WORKS</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                Selected Works & Deployments
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                Categorized by 1 Academic, 2 Commercial, and 2 Personal systems
              </p>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-zinc-900 rounded-lg border border-slate-300 dark:border-zinc-800 text-xs font-mono">
              {(['All', 'Academic', 'Commercial', 'Personal'] as const).map((cat) => {
                const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
                const isCurrent = filter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 font-semibold shadow-sm'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-60 ml-1">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5-Card Responsive Flex Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredProjects.map((proj) => {
            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`group relative rounded-xl border bg-white dark:bg-zinc-900/60 p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  proj.featured
                    ? 'border-slate-300 dark:border-zinc-700 hover:border-lime-500'
                    : 'border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600'
                }`}
              >
                {/* Card Top */}
                <div className="space-y-2.5">
                  <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-900/90 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-center p-1.5">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-all duration-500 ease-out grayscale-0 group-hover:grayscale group-hover:contrast-105 dark:grayscale dark:contrast-105 dark:group-hover:grayscale-0 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-slate-900 text-white flex-col items-center justify-center p-3 text-center">
                      <Cpu className="w-8 h-8 text-lime-400 opacity-60 mb-1" />
                      <span className="text-xs font-mono">{proj.title}</span>
                    </div>

                    {proj.featured && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 dark:bg-zinc-950/90 border border-lime-500/50 text-[10px] font-mono text-lime-600 dark:text-lime-400 backdrop-blur-sm shadow-sm">
                        <Star className="w-3 h-3 fill-lime-500" />
                        <span>Star</span>
                      </div>
                    )}
                  </div>

                  {/* Category Pill Tag */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      proj.category === 'Academic'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                        : proj.category === 'Commercial'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                    }`}>
                      {proj.category}
                    </span>
                    <span className="text-slate-400 dark:text-zinc-500">{proj.date}</span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors flex items-center justify-between">
                      <span className="line-clamp-1">{proj.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 group-hover:text-lime-500 transition-colors shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 mt-1 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-zinc-500 truncate max-w-[120px]">
                    {proj.stack.slice(0, 2).map((st, i) => (
                      <React.Fragment key={st}>
                        <span>{st}</span>
                        {i < Math.min(proj.stack.length, 2) - 1 && <span className="opacity-40">/</span>}
                      </React.Fragment>
                    ))}
                    {proj.stack.length > 2 && <span>+{proj.stack.length - 2}</span>}
                  </div>

                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 group-hover:text-lime-600 dark:group-hover:text-lime-400">
                    Inspect →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
