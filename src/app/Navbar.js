'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import whatappIcon from '@assets/icons/whatsapp.svg';
import Link from 'next/link';
import { fetchCategories } from '@utils/queryFunctions';
import { useQuery } from 'react-query';
import Spinner from '@components/LoadingSpinner';
import { Suspense } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  const { data: categories, isLoading } = useQuery(
    'categories',
    fetchCategories
  );

  return (
    <Suspense>
      <nav
        style={{
          boxShadow: '0px -1px 1px 0px rgba(0, 0, 0, 0.70)',
        }}
        className={`sticky top-0 left-0 md:col-span-3 lg:col-span-2 md:h-screen bg-white md:overflow-x-hidden md:overflow-y-scroll z-40 md:block ${
          pathname.startsWith('/news') && 'hidden'
        }`}
      >
        <div className="flex items-center justify-between md:justify-center py-4 pr-8 pl-5 md:px-0 md:h-40">
          <Link href={'/'}>
            <img
              src="/logo.png"
              alt="the hit"
              className="object-containw h-12 md:h-16"
            />
          </Link>
          <span className="bg-gray-200 flex items-center justify-between gap-2 py-2 px-4 rounded-[80px] md:hidden">
            <img src={whatappIcon.src} alt="whatsapp icon" />
            <p>Join Our Group</p>
          </span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-2">
            <Spinner />
            <span className="text-lg font-medium text-gray-800">
              Loading categories
            </span>
          </div>
        ) : (
          <ul className="flex items-center justify-between gap-2 md:gap-0 overflow-x-auto whitespace-nowrap border-b border-[#F6F6F6] md:border-none md:flex-col md:items-start md:whitespace-normal">
            {categories.map((item) => {
              return (
                <li
                  key={item.name}
                  className={`md:border md:border-t md:last:border-b md:border-[#F6F6F6] md:w-full border-b-4 ${
                    decodeURIComponent(category) === item.name.trim()
                      ? 'md:bg-orange-100 border-orange-400 md:border-transparent'
                      : 'border-transparent bg-transparent'
                  }`}
                >
                  <Link
                    href={'/?category=' + item.name}
                    replace
                    className={`flex items-center py-2 px-4 md:py-4 md:px-6 gap-2 md:gap-4 md:hover:bg-gray-200 w-max md:w-full`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="h-6 w-6 object-contain"
                    />
                    <p className="font-semibold">{item.name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </Suspense>
  );
}
