import React, { useRef, useState, useEffect } from 'react';
import { RefreshCw, ExternalLink, Monitor, Smartphone } from 'lucide-react';

interface ScreenViewportProps {
  url: string;
  title: string;
  codename?: string;
  theme?: 'dark' | 'light';
}

export const ScreenViewport: React.FC<ScreenViewportProps> = ({
  url,
  title,
  codename,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'responsive'>('responsive');

  // Standard 16:10 laptop/desktop viewport for scaled mode
  const DESKTOP_WIDTH = 1280;
  const DESKTOP_HEIGHT = 800;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth;
      const calculatedScale = Math.min(availableWidth / DESKTOP_WIDTH, 1);
      setScale(Math.max(calculatedScale, 0.4));
    };

    updateScale();
    const timer = setTimeout(updateScale, 100);
    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const handleReload = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  const screenHeight = viewMode === 'desktop' ? DESKTOP_HEIGHT * scale : 500;

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
      {/* Screen Frame Only (No laptop keyboard chassis / deck) */}
      <div className="w-full relative rounded-2xl p-2 sm:p-2.5 bg-zinc-900 border border-zinc-700/80 shadow-2xl transition-all duration-200">
        {/* Screen Inner Bezel & Display */}
        <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner">
          {/* Browser Chrome Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900 border-b border-zinc-800 text-xs">
            {/* Window Controls & Title */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-300 ml-1.5 truncate max-w-[140px] font-medium">
                {title}
              </span>
            </div>

            {/* URL Display Pill */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 font-mono text-[10px] text-zinc-400 hover:text-lime-400 hover:border-lime-500/50 transition-colors max-w-[220px] sm:max-w-xs truncate cursor-pointer"
              title="Click to open direct URL"
            >
              <span className="text-lime-400 font-semibold">https://</span>
              <span className="truncate">{url.replace('https://', '')}</span>
            </a>

            {/* View Mode & Actions */}
            <div className="flex items-center gap-1.5">
              {/* View Mode Toggle: Responsive (1:1) vs Scaled Desktop (1280px) */}
              <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono">
                <button
                  onClick={() => setViewMode('responsive')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'responsive'
                      ? 'bg-lime-400 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Fluid 1:1 view (crisp fonts & easiest clicking)"
                >
                  <Smartphone className="w-2.5 h-2.5" />
                  <span>Fluid 1:1</span>
                </button>
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    viewMode === 'desktop'
                      ? 'bg-lime-400 text-zinc-950 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Scaled 1280px desktop resolution"
                >
                  <Monitor className="w-2.5 h-2.5" />
                  <span>1280px</span>
                </button>
              </div>

              {/* Reload Button */}
              <button
                onClick={handleReload}
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Reload screen contents"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Fullscreen New Tab Link */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-zinc-400 hover:text-lime-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Launch in full browser window"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Screen Display Area */}
          <div
            className="relative overflow-hidden bg-zinc-950 pointer-events-auto"
            style={{
              height: `${screenHeight}px`,
              width: '100%',
            }}
          >
            {/* Loading Indicator */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-xs font-mono text-zinc-400 z-10 gap-2">
                <RefreshCw className="w-5 h-5 text-lime-400 animate-spin" />
                <span>Loading screen preview…</span>
              </div>
            )}

            {/* Mode 1: Fluid Responsive (1:1 Native Resolution, crisp & 100% clickable) */}
            {viewMode === 'responsive' ? (
              <iframe
                key={`${url}-${iframeKey}-responsive`}
                src={url}
                title={`${title} Screen View`}
                className="w-full h-full border-0 bg-zinc-950 pointer-events-auto"
                onLoad={() => setIframeLoaded(true)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              /* Mode 2: Scaled 1280px Desktop Canvas */
              <div
                style={{
                  width: `${DESKTOP_WIDTH}px`,
                  height: `${DESKTOP_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
                className="pointer-events-auto"
              >
                <iframe
                  key={`${url}-${iframeKey}-desktop`}
                  src={url}
                  title={`${title} Scaled Desktop Screen View`}
                  className="w-full h-full border-0 bg-zinc-950 pointer-events-auto"
                  onLoad={() => setIframeLoaded(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screen Specs & Live Interaction Bar */}
      <div className="mt-2.5 flex items-center justify-between w-full px-2 text-[11px] font-mono text-slate-500 dark:text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Monitor className="w-3.5 h-3.5 text-lime-500" />
          <span>Interactive Screen Only</span>
          <span className="opacity-40">·</span>
          <span>{viewMode === 'responsive' ? 'Fluid 1:1 Native View' : '1280×800 Scaled Desktop'}</span>
        </span>
        <span className="hidden sm:inline-block text-slate-400 dark:text-zinc-500">
          All links, buttons & canvas are fully clickable
        </span>
      </div>
    </div>
  );
};
