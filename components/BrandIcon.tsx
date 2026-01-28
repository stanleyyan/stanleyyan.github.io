
import React, { useState } from 'react';

interface BrandIconProps {
  className?: string;
  animate?: boolean;
  src?: string;
}

/**
 * Audlis "Pure-A" Logo v38.7
 * Precision container for transparent 3D brand assets.
 * Shadows and glows removed for a clean, integrated aesthetic.
 */
const BrandIcon: React.FC<BrandIconProps> = ({ 
  className = "w-10 h-10", 
  animate = true,
  src = "/logo.png" 
}) => {
  const [hasError, setHasError] = useState(false);

  // Fallback high-end geometric 'A' if local logo.png is missing.
  const fallbackAesthetic = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"; 

  return (
    <div className={`relative ${className} flex items-center justify-center transition-all hover:scale-110 active:scale-90 duration-700`}>
      {/* Shadow and Glow removed as requested */}
      
      {/* The Asset - Expects Transparent PNG */}
      <img 
        src={hasError ? fallbackAesthetic : src} 
        alt="Audlis Transparent Identity"
        onError={() => setHasError(true)}
        className={`w-full h-full object-contain relative z-10 select-none pointer-events-none ${animate ? 'animate-float-subtle' : ''}`}
      />
      
      <style>{`
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0) scale(1) rotateX(2deg); }
          50% { transform: translateY(-4px) scale(0.98) rotateX(0deg); }
        }
        .animate-float-subtle {
          animation: float-subtle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BrandIcon;
