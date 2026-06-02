import Tag from '../common/Tag';

interface RoleTagRowProps {
  primaryTags: string[];
  secondaryTags: string[];
}

const RoleTagRow: React.FC<RoleTagRowProps> = ({ primaryTags, secondaryTags }) => (
  <div className="flex flex-wrap gap-1.5 mt-4">
    {primaryTags.map((tag) => (
      <Tag key={tag} label={tag} variant="blue" />
    ))}
    {secondaryTags.map((tag) => (
      <Tag
        key={tag}
        label={tag}
        variant="gray"
      />
    ))}
  </div>
);

export default RoleTagRow;
