import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'dark' | 'light' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

/**
 * Official GrayQuest Icon Mark (Concentric Target & Spiral Q with accent dot)
 */
export const GrayQuestIcon: React.FC<{ className?: string; color?: string }> = ({ 
  className = 'w-8 h-8', 
  color = '#4C35DE' 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Middle Concentric Ring */}
      <circle 
        cx="44" 
        cy="44" 
        r="23" 
        stroke={color} 
        strokeWidth="7.5" 
        strokeLinecap="round"
      />
      
      {/* Inner Concentric C-Spiral */}
      <path 
        d="M 52 35.5 A 11.5 11.5 0 1 0 52 52.5 L 48 52.5" 
        stroke={color} 
        strokeWidth="7" 
        strokeLinecap="round"
      />

      {/* Outer Broken Concentric Ring */}
      <path 
        d="M 68 22 A 36 36 0 1 0 66 66" 
        stroke={color} 
        strokeWidth="8" 
        strokeLinecap="round"
      />

      {/* Distinctive GrayQuest Accent Dot at bottom-right */}
      <circle 
        cx="73" 
        cy="73" 
        r="6.5" 
        fill={color} 
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'default',
  size = 'md',
  showText = true 
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8.5 h-8.5',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-[19px]',
    md: 'text-[23px]',
    lg: 'text-[27px]',
    xl: 'text-[32px]',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none group ${className}`}>
      {/* Official GrayQuest Logo Icon */}
      <div className="transition-transform duration-200 group-hover:scale-105">
        <GrayQuestIcon 
          className={iconSizes[size]} 
          color={isLight ? '#FFFFFF' : '#4C35DE'} 
        />
      </div>

      {/* Official GrayQuest Typography */}
      {showText && (
        <div className="flex items-baseline tracking-[-0.03em] font-sans font-bold leading-none select-none">
          <span 
            className={`font-black ${
              isLight 
                ? 'text-white' 
                : variant === 'dark' 
                  ? 'text-brand-navy' 
                  : 'text-[#4C35DE]'
            } ${textSizes[size]}`}
            style={{ letterSpacing: '-0.035em' }}
          >
            gray
          </span>
          <span 
            className={`font-black ${
              isLight 
                ? 'text-indigo-300' 
                : 'text-[#4C35DE]'
            } ${textSizes[size]}`}
            style={{ letterSpacing: '-0.035em' }}
          >
            Quest
          </span>
        </div>
      )}
    </div>
  );
};

