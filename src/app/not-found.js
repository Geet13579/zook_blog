import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center mt-20 md:mt-0 md:h-screen w-full">
      <div className="text-center">
        <h2 className="my-3 font-semibold text-4xl">404</h2>
        <p className="text-xl mb-10">Could not find requested resource</p>
        <Link href="/" className="py-2 px-8 rounded-lg font-semibold border-4">
          Home
        </Link>
      </div>
    </div>
  );
}
