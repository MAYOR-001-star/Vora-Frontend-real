import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from '../../common/Icons';
import VoraLogo from '../../common/VoraLogo';
import { TALENT_NAV_ITEMS } from '../../../constants/navigation';

interface RoleApplyAppShellProps {
  userName: string;
  userInitials: string;
  children: React.ReactNode;
}

const ROLE_APPLY_NAV = TALENT_NAV_ITEMS.filter((item) => item.name !== 'Settings').map((item) =>
  item.name === 'Dashboard' ? { ...item, name: 'Home' } : item,
);

const RoleApplyAppShell: React.FC<RoleApplyAppShellProps> = ({
  userName,
  userInitials,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 bg-black/45 z-[150] lg:hidden cursor-default"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[200] w-[220px] bg-white border-r border-[#E6E6E6] flex flex-col transition-transform duration-250 lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-5 py-6 border-b border-[#E6E6E6]">
          <VoraLogo size="md" />
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {ROLE_APPLY_NAV.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold border-l-[3px] transition-colors ${
                index === 0
                  ? 'border-l-[#0047CC] bg-[#EBF6FF] text-[#0047CC]'
                  : 'border-l-transparent text-[#4A4A4A] hover:bg-[#F7F7F7]'
              }`}
            >
              <item.icon size={16} strokeWidth={2} className="shrink-0" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-3.5 border-t border-[#E6E6E6] flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-full bg-[#E6E6E6] flex items-center justify-center text-[11px] font-semibold text-[#4A4A4A] shrink-0 uppercase">
            {userInitials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{userName}</p>
            <p className="text-[11px] text-[#808080] font-medium">Job Seeker</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <header className="lg:hidden sticky top-0 z-[300] bg-white border-b border-[#E6E6E6] px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 cursor-pointer"
            aria-label="Open menu"
          >
            <MenuIcon size={22} />
          </button>
          <VoraLogo size="md" />
        </header>
        {children}
      </div>
    </div>
  );
};

export default RoleApplyAppShell;

export const buildUserInitials = (firstName: string, lastName?: string): string => {
  const first = firstName.trim().charAt(0);
  const last = lastName?.trim().charAt(0) ?? firstName.trim().charAt(1) ?? '';
  return `${first}${last}`.toUpperCase();
};

export const buildUserDisplayName = (firstName: string, lastName?: string): string => {
  const full = [firstName, lastName].filter(Boolean).join(' ').trim();
  return full || 'Talent';
};
