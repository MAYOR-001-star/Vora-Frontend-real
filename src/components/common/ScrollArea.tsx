import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Scrollable region using the app-wide custom scrollbar (see index.css `.custom-scrollbar`). */
const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = '', style }) => (
  <div className={`overflow-y-auto custom-scrollbar ${className}`} style={style}>
    {children}
  </div>
);

export default ScrollArea;
