import Spinner from '@components/LoadingSpinner';

export default function NewsLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-grow py-2 md:col-span-10 lg:col-span-7">
      <Spinner />
      <span className="text-lg font-medium text-gray-800">Loading news</span>
    </div>
  );
}
