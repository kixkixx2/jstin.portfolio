import { PORTFOLIO_DATA } from '../data/portfolioData';

const STORAGE_KEY = 'gemini_api_key';

export const getStoredApiKey = (): string => {
  if (typeof window === 'undefined') return '';
  return (
    localStorage.getItem(STORAGE_KEY) ||
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    ''
  );
};

export const setStoredApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
};

export const removeStoredApiKey = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};

const SYSTEM_INSTRUCTION = `You are the interactive terminal assistant bot on Jastin Lamug's personal portfolio website (terminal: contact.sh).
Your goal is to answer visitor inquiries professionally, concisely, and warmly.

About Jastin Lamug:
- Name: Jastin Lamug (preferred handle: "jstn" or "kixkixx2")
- Location: Isabela, Philippines
- Academic Background: Graduated Cum Laude with a BS in Computer Science (Major in Data Mining) from Isabela State University (Echague Main Campus). General Weighted Average (GWA): 1.518.
- Certifications & Eligibility:
  • Honor Graduate Eligibility under Presidential Decree No. 907 (Civil Service Commission)
  • Career Service Professional Examination Eligible
  • Accenture Technology Academy — Salesforce Track training certificate
- Work & Roles Availability:
  • OPEN FOR: Web Development opportunities (Frontend / Full-Stack), software engineering roles, collaborative projects, AND ANY OFFICE IT-RELATED WORK (hardware, troubleshooting, local networking, office tech setups, system operations).
- Core Tech Stack:
  • Frontend: React 19, TypeScript, JavaScript (ESNext), Tailwind CSS, Vite, HTML5, CSS3
  • Backend & Systems: Python, Node.js, Express, Flask, C++, SQL, SQLite, Socket.IO, WebSockets
  • Data Science & ML: High-dimensional UMAP manifold projection, K-Means clustering, Scikit-learn, Pandas, NumPy
  • Automation & Tools: n8n workflow orchestration, Webhooks, REST APIs, Git, Google Gemini AI
- Featured Projects:
  1. K-UMAP Health Analytics (Thesis): Machine learning pipeline for Isabela State University infirmary student records combining UMAP and K-Means.
  2. Queue Management System (DMW/OWWA): Standalone offline-resilient local network queue system with sub-millisecond Socket.IO synchronization and SQLite data storage for overseas worker migrant facilities.
  3. J.P. Lamug-Daquioag Clinic Portal: Live patient portal and services directory for OB-GYNE practice (https://j-p-lamug-daquioag.vercel.app/).
  4. Stock Market News Intelligence: Automated n8n pipeline analyzing financial news feeds using Gemini AI sentiment extraction and Discord webhooks.
  5. Gmail Signature Generator Studio: Interactive client-side HTML email signature studio with real-time preview (https://kixkixx2.github.io/gmail.sig.generator/).
- Contact Channels & Links:
  • Resume: https://kixkixx2.github.io/resume/
  • Primary Email: jastinlamug26@gmail.com
  • GitHub: https://github.com/kixkixx2
  • LinkedIn: https://www.linkedin.com/in/jastin-lamug-0253253a4
  • Facebook: https://www.facebook.com/masterjastin.26/

Response Style:
- Keep responses concise, formatted cleanly for a monospace terminal screen.
- Use bullet points when listing items.
- Be polite, encouraging, and highlight Jastin's strengths, reliability, and readiness to work.`;

export const getLocalChatbotResponse = (query: string): string => {
  const q = query.toLowerCase().trim();

  if (q === 'clear') {
    return '__CLEAR__';
  }

  if (q.startsWith('set-key ') || q.startsWith('api-key ')) {
    const key = q.replace(/^(set-key|api-key)\s+/, '').trim();
    if (!key) return 'Error: Please provide a valid Gemini API key. Usage: set-key YOUR_API_KEY';
    setStoredApiKey(key);
    return '✓ Gemini API key successfully saved to localStorage!\nThe chatbot is now running with live Google Gemini AI.';
  }

  if (q === 'clear-key' || q === 'remove-key') {
    removeStoredApiKey();
    return '✓ Gemini API key removed. Reverted to built-in offline assistant.';
  }

  if (q === 'key' || q === 'check-key') {
    const key = getStoredApiKey();
    if (key) {
      return `✓ Gemini API key is active (${key.slice(0, 4)}...${key.slice(-4)}). Using live Gemini AI.`;
    }
    return 'No Gemini API key currently set. Using built-in offline responses.\n(To connect live Gemini AI on GitHub Pages, set VITE_GEMINI_API_KEY or type: set-key YOUR_API_KEY)';
  }

  if (q === 'help' || q === 'commands' || q.includes('what can you do')) {
    return `Available Commands & Queries:
• "whoami" / "about" — Jastin's bio and background
• "skills" / "stack" — Technical languages, frameworks & tools
• "projects" / "works" — Featured software and web applications
• "office it" / "it" — IT support, networking & office technical expertise
• "education" / "gwa" — Degree, Latin honors & certifications
• "resume" / "cv" — Direct link to interactive resume
• "hire me" / "availability" — Work status and collaboration opportunities
• "contact" / "email" — Direct contact channels and links
• "set-key <API_KEY>" — Configure Gemini API key for live AI
• "clear" — Clear console history`;
  }

  if (q.includes('resume') || q.includes('cv')) {
    return `Interactive Resume & Credentials:
Direct Link: https://kixkixx2.github.io/resume/
Features detailed academic records, BSCS coursework, certifications, and technical experience.`;
  }

  if (q.includes('whoami') || q.includes('who are you') || q.includes('about') || q.includes('tell me about yourself')) {
    return `Jastin Lamug (jstn / kixkixx2) — Web Developer & Computer Science graduate (Cum Laude) from Isabela State University.
He combines solid algorithmic fundamentals with hands-on full-stack development, machine learning (UMAP/K-Means), and workflow automation.`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tech') || q.includes('python') || q.includes('react') || q.includes('javascript') || q.includes('typescript')) {
    return `Core Technology Stack:
• Frontend: React 19, TypeScript, JavaScript, Tailwind CSS, Vite, HTML5/CSS3
• Backend & Databases: Python, Node.js, Express, Flask, C++, SQL, SQLite, Socket.IO
• Data Science & ML: UMAP manifold projection, K-Means clustering, Pandas, NumPy, Scikit-learn
• Automation & Tools: n8n, Webhooks, REST APIs, Git, Google Gemini AI`;
  }

  if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('thesis')) {
    return `Selected Works & Deployments:
1. K-UMAP Health Analytics (Thesis) — Dual-algorithmic ML dimensionality reduction & clustering pipeline for student health records.
2. Queue Management System — Standalone offline local network queuing architecture deployed for DMW/OWWA migrant worker facilities.
3. J.P. Lamug-Daquioag Clinic Portal — Healthcare clinic web application with service directory and appointment inquiries.
4. Stock Market News Intelligence — Automated n8n financial news pipeline with Gemini AI sentiment routing to Discord.
5. Gmail Signature Generator Studio — Responsive HTML email signature designer studio.`;
  }

  if (q.includes('office') || q.includes(' it') || q === 'it' || q.includes('support') || q.includes('network') || q.includes('hardware') || q.includes('troubleshoot')) {
    return `Office IT & Systems Capabilities:
✓ Local network architecture (deployed paperless offline server/client queue systems on LAN)
✓ Database management and offline-first data integrity (SQLite, SQL, structured records)
✓ Computer systems hardware setup, troubleshooting, OS configurations & maintenance
✓ Enterprise training via Accenture Technology Academy (Salesforce Track)
✓ High attention to administrative workflows, data privacy, and documentation integrity.`;
  }

  if (q.includes('education') || q.includes('school') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('gwa') || q.includes('honor') || q.includes('cum laude')) {
    return `Academic Credentials:
• Degree: Bachelor of Science in Computer Science (Major in Data Mining)
• Institution: Isabela State University (Echague Main Campus)
• Honors: Cum Laude (GWA: 1.518)
• Professional Eligibility: CSC Honor Graduate Eligibility (PD 907) & Career Service Professional Level Passer.`;
  }

  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('opportunity') || q.includes('status') || q.includes('salary') || q.includes('remote') || q.includes('collaborate')) {
    return `Status: OPEN FOR WORK!
Jastin is actively available for:
• Web Development Opportunities (Frontend / Full-Stack)
• Office IT-Related Work & Technical Support
• Software Engineering roles & Collaborative projects.

Send a direct email to ${PORTFOLIO_DATA.profile.email} or view his resume at https://kixkixx2.github.io/resume/`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('social') || q.includes('message')) {
    return `Direct Contact Channels:
• Primary Email: ${PORTFOLIO_DATA.profile.email}
• Backup Email: ${PORTFOLIO_DATA.profile.backupEmail}
• Resume: https://kixkixx2.github.io/resume/
• GitHub: ${PORTFOLIO_DATA.profile.github}
• LinkedIn: ${PORTFOLIO_DATA.profile.linkedin}
• Facebook: ${PORTFOLIO_DATA.profile.facebook}
• Location: ${PORTFOLIO_DATA.profile.location}`;
  }

  if (q.includes('hello') || q.includes('hi') || q === 'hey' || q.includes('good morning') || q.includes('good afternoon')) {
    return `Hello! 👋 Great to meet you! How can I help you learn more about Jastin's web development, office IT experience, or projects today?`;
  }

  if (q.includes('thank')) {
    return `You're very welcome! Feel free to ask anything else or reach out directly to Jastin at ${PORTFOLIO_DATA.profile.email}.`;
  }

  return `I received: "${query}"
I'm Jastin's assistant bot. You can ask me about his:
• Web development experience ("skills")
• Selected systems ("projects")
• Office IT & network capabilities ("office it")
• Education & Cum Laude honors ("education")
• Interactive resume ("resume")
• Job availability & hiring ("hire me")
• Contact channels ("contact")`;
};

export const fetchGeminiResponse = async (
  prompt: string,
  apiKey: string
): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 600,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `API error (${response.status})`;
    throw new Error(message);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No response text generated by Gemini.');
  }

  return text.trim();
};

export const queryChatbot = async (query: string): Promise<string> => {
  const q = query.trim();
  if (!q) return '';

  // Intercept direct terminal commands first
  const lower = q.toLowerCase();
  if (
    lower === 'clear' ||
    lower.startsWith('set-key ') ||
    lower.startsWith('api-key ') ||
    lower === 'clear-key' ||
    lower === 'remove-key' ||
    lower === 'key' ||
    lower === 'check-key'
  ) {
    return getLocalChatbotResponse(q);
  }

  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const liveResponse = await fetchGeminiResponse(q, apiKey);
      return liveResponse;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn('Gemini API call failed, falling back to local handler:', errorMsg);
      const fallback = getLocalChatbotResponse(q);
      return `${fallback}\n\n[Note: Gemini API returned: "${errorMsg}". Used local response.]`;
    }
  }

  // No API key: return smart local answer
  return getLocalChatbotResponse(q);
};
