'use client';

import ShareIcon from '@components/ShareIcon';
import { useRouter } from 'next/navigation';

export default function NewsNavbar({ data }) {
  const router = useRouter();

  return (
    <div className="md:hidden border-b border-gray-300 sticky top-0 left-0 bg-white py-4 px-5 flex items-center justify-between">
      <span onClick={() => router.back()}>{backArrowIcon}</span>
      <ShareIcon className="p-1 cursor-pointer" data={data} />
    </div>
  );
}

const backArrowIcon = (
  <svg
    width={27}
    height={27}
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.8672 21.0938L5.27344 13.5L12.8672 5.90625M6.32812 13.5H21.7266"
      stroke="#4D4D4D"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
