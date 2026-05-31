import Tag from '../common/Tag';

interface RoleTagRowProps {
  primaryTags: string[];
  secondaryTags: string[];
}

const RoleTagRow: React.FC<RoleTagRowProps> = ({ primaryTags, secondaryTags }) => (
  <div className="flex flex-wrap gap-1.5 mt-4">
    {primaryTags.map((tag) => (
      <Tag key={tag} label={tag} variant="blue" className="!rounded !px-2.5 !py-1 !text-[12px] !font-medium" />
    ))}
    {secondaryTags.map((tag) => (
      <Tag
        key={tag}
        label={tag}
        variant="gray"
        className="!rounded !px-2.5 !py-1 !text-[12px] !font-medium !bg-[#E6E6E6] !text-[#4A4A4A]"
      />
    ))}
  </div>
);

export default RoleTagRow;
