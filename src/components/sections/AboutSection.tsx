import { Terminal, Cpu, Quote } from 'lucide-react';

interface AboutSectionProps {
  scrollProgress: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ scrollProgress }) => {
  const parallaxX = (scrollProgress * 60).toFixed(1);

  return (
    <section
      id="about"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[900px] h-full overflow-y-auto flex flex-col justify-start px-6 sm:px-12 py-10 select-none max-lg:w-full max-lg:h-auto max-lg:min-h-0 max-lg:min-w-0 max-lg:overflow-x-hidden max-lg:overflow-y-visible"
    >
      {/* Background Section Index */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        02
      </div>

      <div className="relative z-10 max-w-5xl space-y-7">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="text-lime-600 dark:text-lime-400 font-semibold">02</span>
            <span aria-hidden="true">/</span>
            <span>BACKGROUND & INTENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Real Intelligence Meets Artificial Intelligence
          </h2>
        </div>

        {/* 2-Column Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-light">
            <p>
              I am a web developer and computer science graduate from <strong className="text-slate-900 dark:text-zinc-100 font-medium">Isabela State University</strong>, graduated <strong className="text-lime-600 dark:text-lime-400 font-medium">Cum Laude</strong>, and have solid knowledge and hands-on experience in software development.
            </p>
            <p>
              My engineering approach combines <strong className="text-slate-900 dark:text-zinc-100 font-medium">real intelligence with artificial intelligence (AI)</strong>. Core human reasoning, architectural discipline, and algorithmic fundamentals remain irreplaceable—while modern AI serves as an unmatched catalyst for execution speed and workflow intelligence.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              And I myself actively use AI across my engineering lifecycle—from drafting resilient architectures and refining data algorithms to accelerating modern full-stack web development.
            </p>

            {/* Featured Quote Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 space-y-2 relative">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <blockquote className="text-xs sm:text-sm font-medium italic text-slate-900 dark:text-zinc-100 leading-snug">
                    “I believe that AI cannot replace real human intelligence—but humans who leverage AI will outpace those who don’t.”
                  </blockquote>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                    Jastin Lamug · Core Philosophy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Track Pillars Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="space-y-0.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                Core Engineering Pillars
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-500 font-light">
                The academic and technical track behind my craft:
              </p>
            </div>

            <div className="space-y-3">
              {/* Pillar 01 */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 text-sm font-semibold">
                    <Terminal className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                    <h4>1st Pillar: Fundamentals & SDLC</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 shrink-0">
                    1st – 2nd Year
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-normal">
                  Basic C++, programming theories, data structures, and systematic Software Development Life Cycle (SDLC) principles.
                </p>
              </div>

              {/* Pillar 02 */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 text-sm font-semibold">
                    <Cpu className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                    <h4>2nd Pillar: ML & Algorithms</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 shrink-0">
                    3rd – 4th Year
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-normal">
                  Machine learning, data mining, high-dimensional UMAP manifold reductions, K-Means clustering, and predictive algorithms.
                </p>
              </div>

              {/* Pillar 03 */}
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-200 text-sm font-semibold">
                    <h4>3rd Pillar: AI-Centered Web Dev</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-400/20 text-lime-700 dark:text-lime-300 font-medium shrink-0">
                    Current
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-normal">
                  Modern web engineering (React, TypeScript, Vite, Tailwind CSS) enhanced by AI intelligence, automated workflows, and clean user-first design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
