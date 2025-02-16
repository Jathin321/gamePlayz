'use client';

import { useState } from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const NavItems2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const pathname = usePathname();

  const navItems2 = [
    { href: '/', label: 'Home' },
    {
      label: 'Play',
      sub: [
        { href: '/tournaments', label: 'Tournaments' },
        { href: '/scrims', label: 'Scrims' },
      ],
    },
    {
      label: 'Find',
      sub: [
        { href: '/teams', label: 'Find Team' },
        { href: '/players', label: 'Find Players' },
      ],
    },
    { href: '/spaces', label: 'Spaces' },
    { href: '/about', label: 'About' },
  ];

  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {navItems2.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href));

        let className =
          'block py-2 px-3 rounded-lg md:p-0 cursor-pointer ';
        if (isActive) {
          className +=
            'bg-[#A78BFA] text-white md:bg-transparent md:text-[#A78BFA]';
        } else {
          className +=
            'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#A78BFA] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
        }

        if (item.sub) {
          return (
            <li key={item.label} className="relative">
              <div
                className={`${className}`}
                onClick={() => toggleDropdown(item.label)}
              >
                <span className='flex'>{item.label}<ChevronDown height={15} className='mt-1'/></span>
              </div>
              {openDropdown === item.label && (
                <ul className="z-50 absolute border border-violet-600 left-0 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-black">
                  {item.sub.map((subItem) => (
                    <li key={subItem.href}>
                      <Link href={subItem.href}>
                        <div className="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                          {subItem.label}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link href={item.href}>
              <div className={className}>{item.label}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems2;