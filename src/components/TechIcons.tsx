import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const normalized = name.toLowerCase().replace(/[\s.-]/g, '');

  switch (normalized) {
    case 'python':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.91 2C6.88 2 7.21 4.18 7.21 4.18L7.22 6.44H12V7.19H5.06C2.28 7.19 2 9.4 2 11.96C2 14.88 3.65 14.6 3.65 14.6H5.29V12.33C5.29 9.69 7.6 9.69 7.6 9.69H12.34C14.79 9.69 14.79 7.37 14.79 7.37V4.54C14.79 4.54 15.02 2 11.91 2ZM9.44 3.38C9.9 3.38 10.28 3.76 10.28 4.22C10.28 4.68 9.9 5.06 9.44 5.06C8.98 5.06 8.6 4.68 8.6 4.22C8.6 3.76 8.98 3.38 9.44 3.38Z"
            fill="#387EB8"
          />
          <path
            d="M12.09 22C17.12 22 16.79 19.82 16.79 19.82L16.78 17.56H12V16.81H18.94C21.72 16.81 22 14.6 22 12.04C22 9.12 20.35 9.4 20.35 9.4H18.71V11.67C18.71 14.31 16.4 14.31 16.4 14.31H11.66C9.21 14.31 9.21 16.63 9.21 16.63V19.46C9.21 19.46 8.98 22 12.09 22ZM14.56 20.62C14.1 20.62 13.72 20.24 13.72 19.78C13.72 19.32 14.1 18.94 14.56 18.94C15.02 18.94 15.4 19.32 15.4 19.78C15.4 20.24 15.02 20.62 14.56 20.62Z"
            fill="#FFE052"
          />
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M7.5 17.5C8.2 18.5 9.2 19 10.4 19C11.7 19 12.7 18.2 12.7 16.8V11.2H10.7V16.8C10.7 17.4 10.2 17.6 9.8 17.6C9.2 17.6 8.8 17.2 8.5 16.5L7.5 17.5ZM13.8 18.6C14.9 19.2 16.2 19.5 17.5 19.5C20.3 19.5 21.8 18.1 21.8 15.8C21.8 13.7 20.5 12.8 18.5 12C17.2 11.5 16.6 11.1 16.6 10.4C16.6 9.7 17.2 9.2 18.1 9.2C19.1 9.2 19.9 9.6 20.5 10.4L21.7 9.1C20.8 8 19.6 7.6 18.1 7.6C15.6 7.6 14.3 9.1 14.3 11.1C14.3 13 15.4 13.9 17.4 14.7C18.8 15.3 19.4 15.8 19.4 16.6C19.4 17.4 18.6 18 17.4 18C16 18 15 17.3 14.3 16.4L13.8 18.6Z"
            fill="#000000"
          />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M5 8.5H12V10.2H9.5V18.5H7.5V10.2H5V8.5ZM13 17.2C14.1 17.8 15.2 18.1 16.4 18.1C18.9 18.1 20.3 16.8 20.3 14.7C20.3 12.8 19.1 12 17.3 11.2C16.1 10.7 15.6 10.4 15.6 9.7C15.6 9.1 16.1 8.7 17 8.7C17.9 8.7 18.6 9.1 19.1 9.8L20.2 8.6C19.4 7.6 18.3 7.2 17 7.2C14.8 7.2 13.6 8.5 13.6 10.4C13.6 12.1 14.6 12.9 16.4 13.7C17.7 14.3 18.2 14.7 18.2 15.5C18.2 16.2 17.5 16.7 16.4 16.7C15.2 16.7 14.3 16.1 13.6 15.3L13 17.2Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'react':
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'vite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.5 4.5L12.5 21.5L2.5 4.5L14 3L21.5 4.5Z"
            fill="url(#vite-grad)"
          />
          <path
            d="M15.5 2.5L8.5 14.5H12.5L9.5 20.5L17.5 9.5H13.5L15.5 2.5Z"
            fill="#FFD62E"
          />
          <defs>
            <linearGradient id="vite-grad" x1="2.5" y1="3" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF" />
              <stop offset="1" stopColor="#BD34FE" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'tailwindcss':
    case 'tailwind':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 6C9 6 7.2 7.5 6.6 10.5C7.8 8.7 9.3 8.1 11.1 8.7C12.1 9.04 12.8 9.75 13.6 10.56C14.9 11.88 16.4 13.4 20 13.4C23 13.4 24.8 11.9 25.4 8.9C24.2 10.7 22.7 11.3 20.9 10.7C19.9 10.36 19.2 9.65 18.4 8.84C17.1 7.52 15.6 6 12 6ZM4 13.4C1 13.4 -0.8 14.9 -1.4 17.9C-0.2 16.1 1.3 15.5 3.1 16.1C4.1 16.44 4.8 17.15 5.6 17.96C6.9 19.28 8.4 20.8 12 20.8C15 20.8 16.8 19.3 17.4 16.3C16.2 18.1 14.7 18.7 12.9 18.1C11.9 17.76 11.2 17.05 10.4 16.24C9.1 14.92 7.6 13.4 4 13.4Z"
            transform="scale(0.85) translate(2, 0)"
            fill="#38BDF8"
          />
        </svg>
      );

    case 'flask':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 3H15V5H14V8.5L18.7 17.2C19.4 18.5 18.5 20 17 20H7C5.5 20 4.6 18.5 5.3 17.2L10 8.5V5H9V3ZM10 10.5L7.3 15.5H16.7L14 10.5H10Z"
            fill="currentColor"
          />
          <circle cx="12" cy="17.5" r="1" fill="#38BDF8" />
        </svg>
      );

    case 'nodejs':
    case 'node':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z"
            fill="#5FA04E"
          />
          <path
            d="M12 4.2L18.5 8V16L12 19.8L5.5 16V8L12 4.2Z"
            fill="#333333"
          />
          <path
            d="M10 8.5V15.5L14 13.2V10.8L11.8 12.1V9.5H10Z"
            fill="#5FA04E"
          />
        </svg>
      );

    case 'restapis':
    case 'restapi':
    case 'rest':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="6" rx="2" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="5" cy="7" r="1" fill="#10B981" />
          <circle cx="8" cy="7" r="1" fill="#10B981" />
          <rect x="2" y="14" width="20" height="6" rx="2" stroke="#06B6D4" strokeWidth="1.5" />
          <circle cx="5" cy="17" r="1" fill="#06B6D4" />
          <circle cx="8" cy="17" r="1" fill="#06B6D4" />
          <path d="M16 10V14M16 14L14 12M16 14L18 12" stroke="#A3E635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'firebase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 17.5L6.8 3.5C6.9 2.9 7.7 2.7 8.1 3.2L10.5 7.8L4.5 17.5Z" fill="#FFA000" />
          <path d="M12.3 9.4L10.5 6.1C10.2 5.5 9.4 5.6 9.2 6.2L4.5 17.5L12.3 9.4Z" fill="#F57C00" />
          <path d="M19.5 17.5L17.2 4.6C17.1 4 16.3 3.8 15.9 4.3L4.5 17.5L11.5 21.5C11.8 21.7 12.2 21.7 12.5 21.5L19.5 17.5Z" fill="#FFCA28" />
        </svg>
      );

    case 'firestore':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="6" rx="8" ry="3" fill="#FF9100" />
          <path d="M4 6V11C4 12.66 7.58 14 12 14C16.42 14 20 12.66 20 11V6" stroke="#FF6D00" strokeWidth="1.5" />
          <path d="M4 11V16C4 17.66 7.58 19 12 19C16.42 19 20 17.66 20 16V11" stroke="#FF6D00" strokeWidth="1.5" />
          <path d="M12 9C10.5 11 11.5 13 12 14C12.5 13 13.5 11 12 9Z" fill="#FFE082" />
        </svg>
      );

    case 'sqlite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="5" rx="8" ry="3" fill="#003B57" />
          <path d="M4 5V19C4 20.66 7.58 22 12 22C16.42 22 20 20.66 20 19V5" fill="#0F80C1" opacity="0.85" />
          <path d="M4 5C4 6.66 7.58 8 12 8C16.42 8 20 6.66 20 5" stroke="#FFFFFF" strokeWidth="1" />
          <path d="M4 12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12" stroke="#FFFFFF" strokeWidth="1" />
          <text x="12" y="15" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SQL</text>
        </svg>
      );

    case 'sql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="5" rx="8" ry="2.5" fill="#0284C7" />
          <path d="M4 5V10C4 11.38 7.58 12.5 12 12.5C16.42 12.5 20 11.38 20 10V5" stroke="#0284C7" strokeWidth="1.5" fill="none" />
          <path d="M4 10V15C4 16.38 7.58 17.5 12 17.5C16.42 17.5 20 16.38 20 15V10" stroke="#0284C7" strokeWidth="1.5" fill="none" />
          <path d="M4 15V19C4 20.38 7.58 21.5 12 21.5C16.42 21.5 20 20.38 20 19V15" stroke="#0284C7" strokeWidth="1.5" fill="none" />
          <circle cx="12" cy="18.5" r="1" fill="#38BDF8" />
        </svg>
      );

    case 'pandas':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="11" width="3.5" height="10" rx="1" fill="#150458" />
          <rect x="4" y="3" width="3.5" height="6" rx="1" fill="#E70488" />
          <rect x="10.25" y="7" width="3.5" height="14" rx="1" fill="#150458" />
          <rect x="10.25" y="3" width="3.5" height="2.5" rx="1" fill="#FFCA00" />
          <rect x="16.5" y="13" width="3.5" height="8" rx="1" fill="#E70488" />
          <rect x="16.5" y="3" width="3.5" height="8" rx="1" fill="#150458" />
        </svg>
      );

    case 'numpy':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#013243" />
          <path d="M6 18V6L11 13V6H13V18L8 11V18H6Z" fill="#4DABCF" />
          <path d="M15 18V6H18C19.5 6 20.5 7 20.5 8.5C20.5 10 19.5 11 18 11H16.5V18H15ZM16.5 9.5H18C18.8 9.5 19.2 9.2 19.2 8.5C19.2 7.8 18.8 7.5 18 7.5H16.5V9.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'scikitlearn':
    case 'sklearn':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#3499CD" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="9" cy="12" r="5" fill="#F89939" opacity="0.9" />
          <circle cx="15" cy="12" r="5" fill="#3499CD" opacity="0.8" />
          <path d="M12 8.5C13 9.5 13.5 10.7 13.5 12C13.5 13.3 13 14.5 12 15.5C11 14.5 10.5 13.3 10.5 12C10.5 10.7 11 9.5 12 8.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'umap':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 16L8 8L15 11L19 5" stroke="#A3E635" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
          <path d="M8 8L12 19L19 14" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="5" cy="16" r="2.5" fill="#A3E635" />
          <circle cx="8" cy="8" r="2.5" fill="#38BDF8" />
          <circle cx="15" cy="11" r="2.5" fill="#F59E0B" />
          <circle cx="19" cy="5" r="2" fill="#EC4899" />
          <circle cx="12" cy="19" r="2.5" fill="#10B981" />
          <circle cx="19" cy="14" r="2" fill="#8B5CF6" />
        </svg>
      );

    case 'kmeans':
    case 'k-means':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle partition/cluster boundary lines */}
          <path d="M2 13C7 12 11 11 14 2M11 11C12 15 16 19 22 20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.25" />
          {/* Cluster 1: Lime */}
          <circle cx="4.5" cy="6" r="1.5" fill="#A3E635" opacity="0.85" />
          <circle cx="8.5" cy="4.5" r="1.5" fill="#A3E635" opacity="0.85" />
          <circle cx="4" cy="10" r="1.5" fill="#A3E635" opacity="0.85" />
          {/* Centroid 1: Distinct cross */}
          <path d="M6 7L8 9M8 7L6 9" stroke="#A3E635" strokeWidth="2.2" strokeLinecap="round" />
          {/* Cluster 2: Cyan */}
          <circle cx="16" cy="4.5" r="1.5" fill="#38BDF8" opacity="0.85" />
          <circle cx="20" cy="7" r="1.5" fill="#38BDF8" opacity="0.85" />
          <circle cx="18" cy="10" r="1.5" fill="#38BDF8" opacity="0.85" />
          {/* Centroid 2: Distinct cross */}
          <path d="M17 6L19 8M19 6L17 8" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
          {/* Cluster 3: Amber/Orange */}
          <circle cx="8" cy="18" r="1.5" fill="#F59E0B" opacity="0.85" />
          <circle cx="15" cy="19.5" r="1.5" fill="#F59E0B" opacity="0.85" />
          <circle cx="10" cy="21.5" r="1.5" fill="#F59E0B" opacity="0.85" />
          {/* Centroid 3: Distinct cross */}
          <path d="M11.5 17L13.5 19M13.5 17L11.5 19" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'n8n':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#EA4B71" />
          <circle cx="6" cy="12" r="2" fill="#FFFFFF" />
          <circle cx="18" cy="7" r="2" fill="#FFFFFF" />
          <circle cx="18" cy="17" r="2" fill="#FFFFFF" />
          <path d="M6 12H12M12 12V7H18M12 12V17H18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.7 10.9L13.1 2.3C12.7 1.9 12 1.9 11.6 2.3L9.5 4.4L12.2 7.1C12.8 6.9 13.5 7.1 14 7.6C14.5 8.1 14.7 8.8 14.5 9.4L17.1 12C17.7 11.8 18.4 12 18.9 12.5C19.6 13.2 19.6 14.3 18.9 15C18.2 15.7 17.1 15.7 16.4 15C15.9 14.5 15.7 13.8 15.9 13.2L13.5 10.8V16.3C13.7 16.5 13.8 16.7 13.8 17C13.8 18 13 18.8 12 18.8C11 18.8 10.2 18 10.2 17C10.2 16.5 10.4 16.1 10.7 15.8V9.1C10.4 8.8 10.2 8.4 10.2 7.9C10.2 7.2 10.6 6.6 11.1 6.3L8.5 3.7L2.3 9.9C1.9 10.3 1.9 11 2.3 11.4L10.9 20C11.3 20.4 12 20.4 12.4 20L21.7 12.7C22.1 12.2 22.1 11.4 21.7 10.9Z"
            fill="#F05032"
          />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
};
