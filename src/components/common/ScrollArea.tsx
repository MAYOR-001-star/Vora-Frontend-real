import React from 'react';

type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Scroll axis; defaults to vertical. */
  orientation?: ScrollAreaOrientation;
}

const orientationClasses: Record<ScrollAreaOrientation, string> = {
  vertical: 'overflow-y-auto overflow-x-hidden',
  horizontal: 'overflow-x-auto overflow-y-hidden',
  both: 'overflow-auto',
};

/** Scrollable region using the app-wide custom scrollbar (see index.css `.custom-scrollbar`). */
const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className = '',
  style,
  orientation = 'vertical',
}) => (
  <div
    className={`custom-scrollbar ${orientationClasses[orientation]} ${className}`}
    style={style}
  >
    {children}
  </div>
);

export default ScrollArea;
