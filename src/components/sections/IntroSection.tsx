import React from 'react';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface IntroSectionProps {
  onExploreProjects: () => void;
  onNavigateToContact: () => void;
  scrollProgress: number;
}

export const IntroSection: React.FC<IntroSectionProps> = ({
  onExploreProjects,
  onNavigateToContact,
  scrollProgress,
}) => {
  const { profile } = PORTFOLIO_DATA;
  const parallaxX = (scrollProgress * 40).toFixed(1);

  return (
    <section
      id="intro"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[900px] h-full overflow-y-auto flex flex-col justify-start px-6 sm:px-12 py-10 select-none max-lg:w-full max-lg:h-auto max-lg:min-h-0 max-lg:min-w-0 max-lg:overflow-x-hidden max-lg:overflow-y-visible"
    >
      {/* Background Parallax Layer */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        01
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Kicker */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400 mb-4">
          <span className="text-lime-600 dark:text-lime-400 font-semibold">01</span>
          <span aria-hidden="true">/</span>
          <span>Web Developer</span>
          <span aria-hidden="true">·</span>
          <span>Isabela, Philippines</span>
        </div>

        {/* 2-Column Split: Headline & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Typographic Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 leading-[1.08] text-balance">
              Jastin <span className="text-slate-400 dark:text-zinc-500 font-light">Lamug</span>
            </h1>


            {/* Action Buttons with distinct interactive hover effects */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreProjects}
                className="group flex items-center gap-2.5 px-6 py-3 text-xs font-semibold text-zinc-950 bg-lime-400 hover:bg-lime-300 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
              >
                <span>Explore Works</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNavigateToContact}
                className="group flex items-center gap-2 px-5 py-3 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-600 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500"
              >
                <Mail className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 transition-transform duration-200 group-hover:scale-110" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-72 xl:w-80 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl group">
              <img
                src={profile.images.profile}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500 ease-out grayscale-0 group-hover:grayscale group-hover:contrast-105 dark:grayscale dark:contrast-105 dark:group-hover:grayscale-0"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-slate-900 text-white flex-col items-center justify-center p-6 text-center">
                <span className="text-2xl font-bold">JL</span>
                <span className="text-xs opacity-75 mt-1">Jastin Lamug</span>
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-mono text-lime-400">@kixkixx2</span>
                <span className="text-sm font-semibold">Web Developer & Engineer</span>
                <span className="text-xs opacity-75 font-mono">BS Computer Science · Cum Laude</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Strip Below */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-500 block">
              Academic Standing
            </span>
            <p className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-zinc-100 tabular-nums">
              Cum Laude
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              GWA 1.518
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-500 block">
              Core Focus
            </span>
            <p className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-zinc-100 tabular-nums">
              Web Dev
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              Web Applications & Systems
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-500 block">
              Core Systems
            </span>
            <p className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-zinc-100 tabular-nums">
              5 Projects
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              1 Academic · 2 Commercial · 2 Personal
            </p>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-500 block">
              Certifications
            </span>
            <p className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-zinc-100 tabular-nums">
              3 National
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              Civil Service & Honors
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-500 animate-pulse lg:hidden">
          <span className="w-4 h-[1px] bg-slate-300 dark:bg-zinc-700" />
          <span>Scroll down to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
        </div>
        <div className="mt-6 hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-500 animate-pulse">
          <span className="w-4 h-[1px] bg-slate-300 dark:bg-zinc-700" />
          <span>Scroll trackpad or wheel horizontally to navigate</span>
          <ArrowRight className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
        </div>
      </div>
    </section>
  );
};
