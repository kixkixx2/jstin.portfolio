import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { TechIcon } from '../TechIcons';

interface SkillsSectionProps {
  scrollProgress: number;
}

const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'APIs & Databases',
  'Data Science & ML',
  'Automation & Tools',
] as const;

export const SkillsSection: React.FC<SkillsSectionProps> = ({ scrollProgress }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { skills } = PORTFOLIO_DATA;
  const parallaxX = (scrollProgress * 125).toFixed(1);

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="skills"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[900px] h-full flex flex-col justify-center px-6 sm:px-12 py-8 select-none max-lg:w-full max-lg:h-auto max-lg:min-h-0 max-lg:min-w-0 max-lg:overflow-x-hidden max-lg:overflow-y-visible max-lg:justify-start"
    >
      {/* Background Section Index */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        05
      </div>

      <div className="relative z-10 max-w-6xl w-full space-y-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
              <span className="text-lime-600 dark:text-lime-400 font-semibold">05</span>
              <span aria-hidden="true">/</span>
              <span>TECHNICAL MATRIX</span>
              <span aria-hidden="true">·</span>
              <span>20 CORE TOOLS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Technical Stack & Toolkit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-light">
              Core languages, full-stack frameworks, database architectures, and data science tooling.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs font-mono text-slate-600 dark:text-zinc-300 shrink-0">
            <span>20 Technologies Included</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? skills.length
                : skills.filter((s) => s.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-lime-400 text-zinc-950 font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-zinc-850 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] ${isActive ? 'text-zinc-950/70' : 'opacity-60'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* 20 Skills Grid with Official Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[62vh] overflow-y-auto pr-1 max-lg:max-h-none max-lg:overflow-visible">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="group p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 hover:border-lime-500/50 dark:hover:border-lime-400/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-2 relative"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-zinc-800/80 border border-slate-150 dark:border-zinc-700/50 group-hover:scale-105 transition-transform duration-200 shrink-0">
                  <TechIcon name={skill.name} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 text-right truncate">
                  {skill.badge}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 tracking-tight group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug line-clamp-2 mt-0.5 font-light">
                  {skill.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
