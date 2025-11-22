import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-[32px] overflow-hidden ${className}`}>
      {children}
    </div>
  );
};