import React, { ReactNode } from 'react';

interface MegaMenuContainerProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const MegaMenuContainer: React.FC<MegaMenuContainerProps> = ({ 
  isOpen, 
  children, 
  className = "" 
}) => {
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-6xl bg-card rounded-xl shadow-elegant border border-border z-[9999] transition-all duration-300 backdrop-blur-sm overflow-hidden ${
        isOpen 
          ? 'opacity-100 translate-y-0 visible' 
          : 'opacity-0 -translate-y-4 invisible pointer-events-none'
      } ${className}`}
      style={{ top: '72px' }}
    >
      {/* Arrow pointing up */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45"></div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default MegaMenuContainer;