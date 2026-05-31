interface RoleBulletListProps {
  items: string[];
}

const RoleBulletList: React.FC<RoleBulletListProps> = ({ items }) => (
  <ul className="list-none p-0 m-0">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-2.5 text-sm text-[#4A4A4A] leading-relaxed py-1.5 border-b border-[#F7F7F7] last:border-0"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#0047CC] shrink-0 mt-2" aria-hidden />
        {item}
      </li>
    ))}
  </ul>
);

export default RoleBulletList;
