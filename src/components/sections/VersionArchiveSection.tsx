import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { ExternalLink, Monitor, ArrowUpRight } from 'lucide-react';
import { ScreenViewport } from '../ScreenViewport';

interface VersionArchiveSectionProps {
  scrollProgress: number;
  theme?: 'dark' | 'light';
}

export const VersionArchiveSection: React.FC<VersionArchiveSectionProps> = ({
  scrollProgress,
  theme = 'dark',
}) => {
  const v1 = PORTFOLIO_DATA.versions[0];
  const v2 = PORTFOLIO_DATA.versions[1];
  const [activePreviewVersion, setActivePreviewVersion] = useState<'v1' | 'v2'>('v1');
  const parallaxX = (scrollProgress * 140).toFixed(1);

  const activeVersion = activePreviewVersion === 'v1' ? v1 : v2;

  // Brief, design-focused descriptions (not overdone)
  const simpleDescriptions = {
    v1: "Futuristic dark-themed interface with 3D CSS polyhedra, interactive particle canvas, and a retro terminal script.",
    v2: "Minimalist monochrome interface built with React, focusing on crisp typography, drawer modals, and credential previews.",
  };

  const currentDisplayTitle = activePreviewVersion === 'v1' ? 'Portfolio v1' : 'Portfolio v2';

  return (
    <section
      id="archive"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[900px] h-full flex flex-col justify-center px-6 sm:px-12 py-8 select-none max-lg:w-full max-lg:h-auto max-lg:min-h-0 max-lg:min-w-0 max-lg:overflow-x-hidden max-lg:overflow-y-visible max-lg:justify-start"
    >
      {/* Background Section Index */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        06
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-4">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="text-lime-600 dark:text-lime-400 font-semibold">06</span>
            <span aria-hidden="true">/</span>
            <span>DESIGN ARCHAEOLOGY</span>
            <span aria-hidden="true">·</span>
            <span>PORTFOLIO ARCHIVES</span>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              Interactive Screen Archives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-light">
              Explore previous live versions directly inside the interactive screen display.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Screen on Left, Simple Description on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Interactive Screen Display */}
          <div className="lg:col-span-8 xl:col-span-9 p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 shadow-xl space-y-3">
            {/* Version Switcher Tabs */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePreviewVersion('v1')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activePreviewVersion === 'v1'
                      ? 'bg-lime-400 text-zinc-950 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 bg-slate-100 dark:bg-zinc-800/80'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Portfolio v1</span>
                </button>
                <button
                  onClick={() => setActivePreviewVersion('v2')}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activePreviewVersion === 'v2'
                      ? 'bg-lime-400 text-zinc-950 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 bg-slate-100 dark:bg-zinc-800/80'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Portfolio v2</span>
                </button>
              </div>

              <a
                href={activeVersion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-lime-600 dark:text-lime-400 hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Screen Display (Screen Only, No Keyboard Chassis) */}
            <div className="w-full flex justify-center">
              <ScreenViewport
                url={activeVersion.url}
                title={currentDisplayTitle}
                theme={theme}
              />
            </div>
          </div>

          {/* Right Column: Clean, Simple Description (Not Overdone) */}
          <div className="lg:col-span-4 xl:col-span-3 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-lg space-y-4">
            {/* Version Meta */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-lime-600 dark:text-lime-400">
                <span className="font-semibold">{currentDisplayTitle}</span>
                <span className="opacity-40">·</span>
                <span>{activeVersion.period}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                {currentDisplayTitle}
              </h3>
            </div>

            {/* Simple Punchy Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-light">
              {simpleDescriptions[activePreviewVersion]}
            </p>

            {/* Tech Stack */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold block">
                Stack
              </span>
              <div className="flex flex-wrap gap-1 text-[11px] font-mono text-slate-600 dark:text-zinc-300">
                {activeVersion.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[10px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Clean Direct Launch Button */}
            <div className="pt-2">
              <a
                href={activeVersion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium flex items-center justify-center gap-2 hover:bg-lime-500 dark:hover:bg-lime-400 hover:text-zinc-950 transition-all duration-200 cursor-pointer shadow-sm group"
              >
                <span>Open Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
