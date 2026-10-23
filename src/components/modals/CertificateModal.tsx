import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Certification } from '../../data/portfolioData';

interface CertificateModalProps {
  cert: Certification | null;
  allCerts: Certification[];
  onClose: () => void;
  onSelectCert: (cert: Certification) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  cert,
  allCerts,
  onClose,
  onSelectCert,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!cert) return;
      const currentIndex = allCerts.findIndex((c) => c.id === cert.id);
      if (e.key === 'ArrowRight' && currentIndex < allCerts.length - 1) {
        onSelectCert(allCerts[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectCert(allCerts[currentIndex - 1]);
      }
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, allCerts, onClose, onSelectCert]);

  if (!cert) return null;

  const currentIndex = allCerts.findIndex((c) => c.id === cert.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allCerts.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span className="text-sm font-semibold truncate max-w-md text-slate-900 dark:text-zinc-100">
              {cert.title}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-500 hidden sm:inline">
              ({currentIndex + 1} of {allCerts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Certificate Image Frame */}
          <div className="relative w-full bg-slate-100 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center justify-center p-2 min-h-[340px] max-h-[540px]">
            <img
              src={cert.image}
              alt={cert.title}
              referrerPolicy="no-referrer"
              className="max-h-[500px] w-auto max-w-full object-contain rounded"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 bg-slate-100 dark:bg-zinc-950 flex-col items-center justify-center p-8 text-center">
              <Award className="w-12 h-12 text-lime-600 dark:text-lime-400 mb-3 opacity-60" />
              <h4 className="text-base font-medium text-slate-900 dark:text-zinc-100">{cert.title}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{cert.issuer} · {cert.date}</p>
            </div>
          </div>

          {/* Certificate Meta Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-200 dark:border-zinc-800/80">
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">Credential / Distinction</span>
              <p className="text-sm font-medium mt-0.5 text-slate-900 dark:text-zinc-100">{cert.title}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">Issuing Body</span>
              <p className="text-sm font-medium mt-0.5 text-slate-900 dark:text-zinc-100">{cert.issuer}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider block">Issue Date</span>
              <p className="text-sm font-medium mt-0.5 text-slate-900 dark:text-zinc-100">{cert.date}</p>
            </div>
          </div>

          <div className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed border-t border-slate-200 dark:border-zinc-800/80 pt-4">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">Significance</span>
            <p>{cert.description}</p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/90 text-xs">
          <button
            onClick={() => hasPrev && onSelectCert(allCerts[currentIndex - 1])}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              hasPrev
                ? 'border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 cursor-pointer shadow-sm'
                : 'border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-600 bg-slate-50 dark:bg-zinc-900 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Credential</span>
          </button>

          <span className="font-mono text-slate-500 dark:text-zinc-400">
            {currentIndex + 1} / {allCerts.length}
          </span>

          <button
            onClick={() => hasNext && onSelectCert(allCerts[currentIndex + 1])}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
              hasNext
                ? 'border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 cursor-pointer shadow-sm'
                : 'border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-600 bg-slate-50 dark:bg-zinc-900 cursor-not-allowed'
            }`}
          >
            <span>Next Credential</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
