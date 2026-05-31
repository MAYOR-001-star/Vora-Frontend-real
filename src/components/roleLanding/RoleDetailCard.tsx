import { CardTitle } from '../common/Typography';

interface RoleDetailCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const RoleDetailCard: React.FC<RoleDetailCardProps> = ({ title, children, className = '' }) => (
  <div className={`bg-white border border-[#E6E6E6] rounded-[10px] px-5 py-5 sm:px-6 ${className}`}>
    <CardTitle as="h2" className="text-base font-semibold mb-3">
      {title}
    </CardTitle>
    {children}
  </div>
);

export default RoleDetailCard;
