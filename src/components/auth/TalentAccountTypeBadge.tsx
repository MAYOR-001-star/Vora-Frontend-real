import { Link } from 'react-router-dom';

import Tag from '../common/Tag';

const TalentAccountTypeBadge: React.FC = () => (
  <div>
    <div className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border-default bg-white flex items-center justify-between">
      <span className="text-[#1A1A1A]">Talent</span>
      <Tag
        label="✓ Confirmed"
        variant="outline"
        className="!text-[11px] !font-medium !px-2.5 !py-0.5 shrink-0"
      />
    </div>
    <p className="text-xs text-[#494848] font-medium mt-2">
      You arrived via a role link, set automatically
    </p>
    <p className="text-xs text-[#494848] font-medium mt-1">
      Posting a role instead?{' '}
      <Link to="/signup" className=" text-[#60A5FA] hover:text-[#2563EB] font-semibold">
        Sign up as an employer →
      </Link>
    </p>
  </div>
);

export default TalentAccountTypeBadge;
