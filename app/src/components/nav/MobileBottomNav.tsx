import { navItems } from './nav';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-[72px]">
        {navItems.map(({ key, label, href, mobile: { Icon } }) => {
          const active = isActive(href);
          return (
            <Link
              key={key}
              href={href}
              className={`relative flex flex-col items-center justify-center space-y-1 transition-colors touch-manipulation ${active ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'
                }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-sky-500 rounded-b-full" />
              )}
              <Icon className={`w-[22px] h-[22px] ${active ? 'fill-sky-50 text-sky-600' : 'text-slate-500'}`} />
              <span className={`text-[10px] text-center ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
