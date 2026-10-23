import React from 'react';
import { Layers, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeSection: number;
  sections: { id: string; label: string; number: string }[];
  onNavigate: (index: number) => void;
  onOpenVersions: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  sections,
  onNavigate,
  onOpenVersions,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark with '/ Web Dev' */}
        <button
          onClick={() => onNavigate(0)}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-500"
          aria-label="Jastin Lamug home"
        >
          <span className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors whitespace-nowrap shrink-0">
            Jastin Lamug
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-500 dark:text-zinc-400 ml-2 tracking-normal">
            / Web Dev
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium"
          aria-label="Main Navigation"
        >
          {sections.map((section, idx) => {
            const isActive = activeSection === idx;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(idx)}
                className={`whitespace-nowrap shrink-0 transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-500 cursor-pointer ${
                  isActive
                    ? 'text-lime-600 dark:text-lime-400 font-semibold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100'
                }`}
              >
                <span className="font-mono text-[10px] opacity-60 mr-1.5">{section.number}</span>
                {section.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-lime-500 dark:bg-lime-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle with Origin Animation + Version Archive Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            id="theme-toggle-btn"
            className="p-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 rounded-lg border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-slate-100/60 dark:bg-zinc-900/60 transition-colors cursor-pointer relative overflow-hidden"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button
            onClick={onOpenVersions}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-zinc-950 bg-lime-400 hover:bg-lime-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 cursor-pointer"
            title="Inspect v1 and v2 portfolio editions in laptop view"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Version Archives</span>
          </button>
        </div>
      </div>
    </header>
  );
};
