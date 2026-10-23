import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setActiveImageIndex(0);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const hasMultipleImages = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="font-semibold text-lime-600 dark:text-lime-400">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.date}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Media Header with Gallery */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900/95 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-center p-2">
            <img
              src={images[activeImageIndex]}
              alt={`${project.title} - Screenshot ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain transition-opacity duration-300 rounded shadow-sm"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 bg-slate-100 dark:bg-zinc-950 items-center justify-center p-6 text-center">
              <div>
                <Cpu className="w-10 h-10 text-lime-600 dark:text-lime-400 mx-auto mb-2 opacity-60" />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">{project.title}</h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{project.category}</p>
              </div>
            </div>

            {/* Gallery Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Image Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeImageIndex
                          ? 'bg-lime-400 scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === activeImageIndex
                      ? 'border-lime-500 shadow-md'
                      : 'border-slate-200 dark:border-zinc-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain p-0.5 bg-slate-900/80 dark:bg-zinc-900"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Title & Summary */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">{project.title}</h3>
            <p className="text-sm text-lime-600 dark:text-lime-400 font-mono mt-1">{project.summary}</p>
          </div>

          {/* Full Description */}
          <div className="space-y-3 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed border-t border-slate-200 dark:border-zinc-800/80 pt-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">System Architecture & Overview</h4>
            <p>{project.description}</p>
          </div>

          {/* Key Algorithms / Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-2 border-t border-slate-200 dark:border-zinc-800/80 pt-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Key Features & Engineering Highlights</h4>
              <ul className="space-y-2">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack List */}
          <div className="space-y-2 border-t border-slate-200 dark:border-zinc-800/80 pt-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">Technologies & Libraries</h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-600 dark:text-zinc-300">
              {project.stack.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span>{tech}</span>
                  {idx < project.stack.length - 1 && <span className="opacity-40">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 dark:border-zinc-800/80 pt-6">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-950 bg-lime-400 hover:bg-lime-300 rounded-lg transition-colors shadow-sm"
              >
                <span>Launch Live System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-slate-200 dark:border-zinc-700 shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 border border-slate-200 dark:border-zinc-700 rounded-lg transition-colors ml-auto cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
