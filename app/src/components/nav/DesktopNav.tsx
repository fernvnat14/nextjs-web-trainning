import { navItems } from './nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DesktopNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href);
  };

  const desktopClass = (href: string) =>
    isActive(href)
      ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-1'
      : 'text-slate-700 hover:text-sky-600 transition-colors font-medium';

  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={desktopClass(item.href)}
          aria-current={isActive(item.href) ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
