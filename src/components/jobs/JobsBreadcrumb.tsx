import React from 'react';
import { Link } from 'react-router-dom';

interface JobsBreadcrumbProps {
  segments: { label: string; to?: string }[];
  className?: string;
  /** Separator between segments. Defaults to "/". */
  separator?: string;
}

const JobsBreadcrumb: React.FC<JobsBreadcrumbProps> = ({
  segments,
  className = '',
  separator = '/',
}) => (
  <nav
    className={`flex items-center gap-1.5 text-[13px] flex-wrap ${className}`}
    aria-label="Breadcrumb"
  >
    {segments.map((segment, index) => {
      const isLast = index === segments.length - 1;
      return (
        <React.Fragment key={`${segment.label}-${index}`}>
          {index > 0 && (
            <span className="text-[#ADADAD]" aria-hidden>
              {separator}
            </span>
          )}
          {segment.to && !isLast ? (
            <Link to={segment.to} className="text-[#0047CC] font-semibold hover:underline">
              {segment.label}
            </Link>
          ) : (
            <span className={isLast ? 'text-[#808080]' : 'text-[#0047CC] font-semibold'}>
              {segment.label}
            </span>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

export default JobsBreadcrumb;
