import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Mail, Github, Linkedin, Facebook, Copy, Check, Send, FileText, Key, Sparkles } from 'lucide-react';
import { queryChatbot, getStoredApiKey } from '../../services/chatbotService';

interface ContactSectionProps {
  scrollProgress: number;
}

// Robust typed output message component that locks in after completion
const TypedOutputMessage: React.FC<{ text: string; onProgress?: () => void; onComplete?: () => void }> = ({ text, onProgress, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isDone) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (onProgress) onProgress();
      } else {
        clearInterval(interval);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, 8);

    return () => clearInterval(interval);
  }, [text, isDone, onProgress, onComplete]);

  return <span>{displayedText}</span>;
};

export const ContactSection: React.FC<ContactSectionProps> = ({ scrollProgress }) => {
  const { profile } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(Boolean(getStoredApiKey()));
  }, []);

  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'input', text: './contact.sh' },
    {
      type: 'output',
      text: " Jastin Bot initialized.\nHi! I'm Jastin's interactive terminal chatbot. Ask me anything about his skills, projects, education, office IT capabilities, or work availability!\n(Try: 'whoami', 'skills', 'projects', 'resume', 'office it', 'hire me', 'contact', or type your own question!)",
    },
  ]);
  const terminalLogsRef = useRef<HTMLDivElement>(null);

  // Allow direct vertical mouse wheel scrolling when hovering the terminal
  useEffect(() => {
    const el = terminalLogsRef.current;
    if (!el) return;

    const handleLogsWheel = (e: WheelEvent) => {
      e.stopPropagation();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', handleLogsWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleLogsWheel);
  }, []);

  const parallaxX = (scrollProgress * 160).toFixed(1);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const executeCommand = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    if (trimmed.toLowerCase() === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    }

    const currentLogs = [...terminalLogs, { type: 'input' as const, text: trimmed }];
    setTerminalLogs(currentLogs);
    setTerminalInput('');
    setIsThinking(true);

    // Auto-scroll
    setTimeout(() => {
      if (terminalLogsRef.current) {
        terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
      }
    }, 20);

    try {
      const response = await queryChatbot(trimmed);
      setHasApiKey(Boolean(getStoredApiKey()));

      setTerminalLogs([
        ...currentLogs,
        { type: 'output' as const, text: response },
      ]);
    } catch {
      setTerminalLogs([
        ...currentLogs,
        { type: 'output' as const, text: 'Something went wrong while processing your request. Please try again.' },
      ]);
    } finally {
      setIsThinking(false);
      setTimeout(() => {
        if (terminalLogsRef.current) {
          terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
        }
      }, 30);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  return (
    <section
      id="contact"
      className="relative shrink-0 w-[95vw] md:w-[85vw] lg:w-[900px] h-full flex flex-col justify-center px-6 sm:px-12 py-10 select-none"
    >
      {/* Background Section Index */}
      <div
        className="absolute top-12 right-12 text-slate-200 dark:text-zinc-900 font-mono text-7xl sm:text-9xl font-bold select-none pointer-events-none opacity-50 dark:opacity-40 transition-transform duration-75"
        style={{ transform: `translateX(-${parallaxX}px)` }}
        aria-hidden="true"
      >
        08
      </div>

      <div className="relative z-10 max-w-5xl space-y-7">
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-zinc-400">
            <span className="text-lime-600 dark:text-lime-400 font-semibold">08</span>
            <span aria-hidden="true">/</span>
            <span>COMMUNICATION</span>
            <span aria-hidden="true">·</span>
            <span>INITIATE DIALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Let's Build?
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-2xl">
            Open for web development opportunities... or any office IT related work and collaborative work..
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
                Direct Channels
              </span>

              {/* Resume Button */}
              <a
                href="https://kixkixx2.github.io/resume/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-lime-500/10 hover:bg-lime-500/20 border border-lime-500/40 text-slate-900 dark:text-zinc-100 transition-all shadow-sm group cursor-pointer"
                title="Open Jastin's Interactive Resume in new tab"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-lime-400 text-zinc-950 font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-snug">Interactive Resume</span>
                    <span className="text-[11px] font-mono text-lime-700 dark:text-lime-400">kixkixx2.github.io/resume/</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-lime-600 dark:text-lime-400 group-hover:translate-x-0.5 transition-transform">
                  View ↗
                </span>
              </a>

              {/* Email Copier */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">Email Address:</span>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                  <span className="text-slate-800 dark:text-zinc-200 truncate mr-2">{profile.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-zinc-900 rounded border border-slate-300 dark:border-zinc-700 transition-colors shrink-0 cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                        <span className="text-lime-600 dark:text-lime-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 block">Verified Profiles:</span>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 text-xs text-slate-800 dark:text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    <span className="font-mono">github.com/{profile.handle}</span>
                  </div>
                  <span className="text-slate-400 dark:text-zinc-500 text-xs font-mono">Profile ↗</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 text-xs text-slate-800 dark:text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    <span className="font-mono">linkedin.com/in/jastin-lamug</span>
                  </div>
                  <span className="text-slate-400 dark:text-zinc-500 text-xs font-mono">Connect ↗</span>
                </a>

                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 text-xs text-slate-800 dark:text-zinc-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    <span className="font-mono">facebook.com/masterjastin.26</span>
                  </div>
                  <span className="text-slate-400 dark:text-zinc-500 text-xs font-mono">Follow ↗</span>
                </a>
              </div>

              <a
                href={`mailto:${profile.email}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-zinc-950 bg-lime-400 hover:bg-lime-300 rounded-md transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>

          {/* Terminal Chatbot Widget */}
          <div className="lg:col-span-7 space-y-2">
            <div className="rounded-2xl border border-slate-300 dark:border-zinc-800 bg-slate-900 dark:bg-zinc-950 text-zinc-100 overflow-hidden shadow-xl flex flex-col font-mono text-xs">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 dark:bg-zinc-900 border-b border-slate-700 dark:border-zinc-800 text-slate-300 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[11px] font-mono ml-2">contact.sh — bash assistant</span>
                </div>

                <div className="flex items-center gap-2">
                  {hasApiKey ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-lime-500/20 text-lime-400 text-[10px] font-mono">
                      <Sparkles className="w-3 h-3 text-lime-400" />
                      <span>OpenRouter Active</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => executeCommand('key')}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-[10px] font-mono transition-colors cursor-pointer"
                      title="Check or configure OpenRouter API key"
                    >
                      <Key className="w-3 h-3 text-zinc-400" />
                      <span>API Key Setup</span>
                    </button>
                  )}
                  <div className="flex items-center gap-1.5 text-[10px] text-lime-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                    <span>online</span>
                  </div>
                </div>
              </div>

              {/* Terminal Logs */}
              <div
                ref={terminalLogsRef}
                data-scrollable="true"
                onWheel={(e) => {
                  e.stopPropagation();
                }}
                className="p-4 space-y-2 max-h-56 overflow-y-auto text-zinc-300 leading-relaxed overscroll-contain select-text"
              >
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="space-y-0.5">
                    {log.type === 'input' ? (
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <span className="text-lime-400">$</span>
                        <span className="text-zinc-100">{log.text}</span>
                      </div>
                    ) : (
                      <div className="text-zinc-300 whitespace-pre-wrap pl-3 border-l border-zinc-700">
                        <TypedOutputMessage
                          text={log.text}
                          onProgress={() => {
                            if (terminalLogsRef.current) {
                              terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
                            }
                          }}
                          onComplete={() => {
                            if (terminalLogsRef.current) {
                              terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-2 text-lime-400/80 font-mono text-[11px] pl-3 py-1 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>

              {/* Quick Command Suggestions */}
              <div className="px-4 py-2 bg-slate-850 dark:bg-zinc-900/60 border-t border-slate-800 dark:border-zinc-800/80 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-zinc-400 mr-1">Ask bot:</span>
                {['whoami', 'skills', 'projects', 'resume', 'office it', 'education', 'hire me', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-2 py-0.5 text-[10px] font-mono text-zinc-300 hover:text-lime-400 bg-slate-800 dark:bg-zinc-900 border border-slate-700 dark:border-zinc-800 rounded transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center px-4 py-2.5 border-t border-slate-800 dark:border-zinc-800 bg-slate-900 dark:bg-zinc-950">
                <span className="text-lime-400 mr-2">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder={
                    isThinking
                      ? "Waiting for response…"
                      : "Ask anything (e.g. 'skills', 'resume', 'office it', 'hire me')…"
                  }
                  disabled={isThinking}
                  className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-xs disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isThinking}
                  className="p-1 text-zinc-400 hover:text-lime-400 transition-colors cursor-pointer disabled:opacity-50"
                  title="Send message to bot"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <div>
            <span>© 2026 Jastin Lamug</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-800 dark:text-zinc-300">&lt;jstn/&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
