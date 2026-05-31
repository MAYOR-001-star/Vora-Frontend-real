import React from 'react';

interface SpinnerProps {
  size?: number | string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 20, className = '' }) => (
  <div
    className={`border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
    style={{ width: size, height: size }}
    aria-hidden
  />
);

export default Spinner;
