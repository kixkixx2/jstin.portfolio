import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DESKTOP_LAYOUT_QUERY,
  isDesktopLayout,
  scrollToSectionInContainer,
  sectionOffsetInContainer,
} from '../layout';

interface HorizontalScrollerProps {
  children: React.ReactNode;
  activeSection: number;
  setActiveSection: (index: number) => void;
  sections: { id: string; label: string; number: string }[];
  onScrollProgressChange?: (progress: number) => void;
  theme: 'dark' | 'light';
}

export const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  activeSection,
  setActiveSection,
  sections,
  onScrollProgressChange,
  theme: _theme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(isDesktopLayout);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_LAYOUT_QUERY);
    const onChange = () => setIsHorizontal(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const horizontal = isDesktopLayout();
    const total = horizontal
      ? el.scrollWidth - el.clientWidth
      : el.scrollHeight - el.clientHeight;
    const progress =
      total > 0 ? (horizontal ? el.scrollLeft : el.scrollTop) / total : 0;
    setScrollProgress(progress);
    if (onScrollProgressChange) onScrollProgressChange(progress);

    const sectionElements = sections.map((s) => document.getElementById(s.id));
    const scrollPos = horizontal
      ? el.scrollLeft + el.clientWidth * 0.35
      : el.scrollTop + el.clientHeight * 0.35;

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const sec = sectionElements[i];
      if (!sec) continue;
      const origin = sectionOffsetInContainer(el, sec, horizontal ? 'x' : 'y');
      if (origin <= scrollPos) {
        setActiveSection(i);
        break;
      }
    }
  }, [sections, setActiveSection, onScrollProgressChange]);

  useEffect(() => {
    handleScroll();
  }, [isHorizontal, handleScroll]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isHorizontal) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      const target = e.target as HTMLElement | null;
      let curr = target;
      while (curr && curr !== el) {
        if (
          curr.getAttribute('data-scrollable') === 'true' ||
          curr.closest('[data-scrollable="true"]')
        ) {
          return;
        }

        const style = window.getComputedStyle(curr);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && curr.scrollHeight > curr.clientHeight) {
          return;
        }
        curr = curr.parentElement;
      }

      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.15;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isHorizontal]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isHorizontal) return;

    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, textarea, select, iframe, [role="button"]')) {
      return;
    }

    isDraggingRef.current = true;
    setIsGrabbing(true);
    startXRef.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeftStartRef.current = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHorizontal || !isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.35;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  const scrollToSection = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      const targetSection = sections[index];
      if (!targetSection) return;

      const secEl = document.getElementById(targetSection.id);
      if (!secEl) return;

      scrollToSectionInContainer(el, secEl);
      setActiveSection(index);
    },
    [sections, setActiveSection]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      const horizontal = isDesktopLayout();
      const nextKeys = horizontal
        ? ['ArrowRight', 'PageDown']
        : ['ArrowDown', 'PageDown'];
      const prevKeys = horizontal
        ? ['ArrowLeft', 'PageUp']
        : ['ArrowUp', 'PageUp'];

      if (nextKeys.includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.min(activeSection + 1, sections.length - 1));
      } else if (prevKeys.includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.max(activeSection - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sections.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sections.length, scrollToSection]);

  const hasPrev = activeSection > 0;
  const hasNext = activeSection < sections.length - 1;

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors">
      {/* Background Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Main Track: horizontal on desktop, vertical on mobile */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`w-full h-full pt-16 pb-20 flex no-scrollbar ${
          isHorizontal
            ? `overflow-x-auto overflow-y-hidden flex-row select-none ${
                isGrabbing ? 'cursor-grabbing' : 'cursor-default'
              }`
            : 'overflow-y-auto overflow-x-hidden flex-col min-w-0'
        }`}
      >
        {children}
      </div>

      {/* Floating Left & Right Section Arrows */}
      {hasPrev && (
        <button
          onClick={() => scrollToSection(activeSection - 1)}
          className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 shadow-xl backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 cursor-pointer"
          aria-label="Previous horizontal section"
          title="Previous section (←)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={() => scrollToSection(activeSection + 1)}
          className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 shadow-xl backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 cursor-pointer"
          aria-label="Next horizontal section"
          title="Next section (→)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Bottom Horizontal Scrubber Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-md border-t border-slate-200 dark:border-zinc-800/80 px-4 sm:px-6 py-2.5 select-none transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Active Section Info */}
          <div className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[190px]">
            <span className="font-mono text-xs font-semibold text-lime-600 dark:text-lime-400 tabular-nums">
              {sections[activeSection]?.number}
            </span>
            <span className="text-slate-400 dark:text-zinc-600 font-mono text-xs">/</span>
            <span className="text-xs font-medium text-slate-900 dark:text-zinc-200 truncate">
              {sections[activeSection]?.label}
            </span>
          </div>

          {/* Scrubber Track with Clickable Nodes */}
          <div className="flex-1 max-w-xl flex items-center gap-1.5 sm:gap-2">
            {sections.map((sec, idx) => {
              const isSelected = activeSection === idx;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(idx)}
                  className={`group relative h-2.5 flex-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-500 cursor-pointer ${
                    isSelected
                      ? 'bg-lime-500 dark:bg-lime-400'
                      : idx < activeSection
                      ? 'bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-600'
                      : 'bg-slate-200 dark:bg-zinc-850 hover:bg-slate-300 dark:hover:bg-zinc-800'
                  }`}
                  aria-label={`Jump to ${sec.label}`}
                  title={`${sec.number}. ${sec.label}`}
                >
                  <span className="sr-only">{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Steppers & Progress % */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 dark:text-zinc-500 tabular-nums">
              {Math.round(scrollProgress * 100)}%
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollToSection(Math.max(activeSection - 1, 0))}
                disabled={!hasPrev}
                className={`p-1.5 rounded border text-xs transition-colors ${
                  hasPrev
                    ? 'border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer'
                    : 'border-slate-200 dark:border-zinc-900 text-slate-300 dark:text-zinc-700 cursor-not-allowed'
                }`}
                aria-label="Previous section"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollToSection(Math.min(activeSection + 1, sections.length - 1))}
                disabled={!hasNext}
                className={`p-1.5 rounded border text-xs transition-colors ${
                  hasNext
                    ? 'border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer'
                    : 'border-slate-200 dark:border-zinc-900 text-slate-300 dark:text-zinc-700 cursor-not-allowed'
                }`}
                aria-label="Next section"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
