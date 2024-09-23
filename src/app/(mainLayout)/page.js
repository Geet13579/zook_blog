'use client';

import { Suspense, useEffect } from 'react';
import Banner from '../../components/Banner';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from 'react-query';
import { fetchPaginatedData, totalItemsPerPage } from '@utils/queryFunctions';
import { queryClient } from '@components/CustomWrapper';
import Spinner from '@components/LoadingSpinner';
import NewsCard from '../../components/NewsCard';
import Link from 'next/link';

const NeetResultsBanner = () => {
  const downloadFile = () => {
    return window.open(
      'https://drive.google.com/uc?export=download&id=1-57isCUHUzYUzhYn6vxVFbZRBqR9ZISK'
    );
  };

  return (
    <div className="bg bg-gray-100 rounded-lg m-2 ">
      <div className="flex flex-row justify-between items-center p-4 rounded-lg flex-wrap ">
        <div>
          <h4 className="font-semibold text-2xl">
            Neet Results UG (MBBS & BDS) 2024
          </h4>
          <p>Chattisgarh State Merit List - Round 1</p>
        </div>
        <div>
          <button
            onClick={downloadFile}
            className="bg-teal-400 px-8 rounded-lg py-2"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  const { data, fetchNextPage, isLoading, isFetching } = useInfiniteQuery(
    ['news', category],
    ({ pageParam = 0 }) => fetchPaginatedData(pageParam, category),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === totalItemsPerPage) {
          return allPages.length;
        } else if (lastPage.length < totalItemsPerPage) {
          return undefined;
        }
      },
    }
  );

  useEffect(() => {
    queryClient.fetchQuery(['news', category]);
  }, [category]);

  useEffect(() => {
    let isFetchingNextPage = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const distanceToBottom = documentHeight - (scrollY + windowHeight);

      if (distanceToBottom < 200 && !isFetchingNextPage) {
        isFetchingNextPage = true;
        fetchNextPage().then(() => {
          isFetchingNextPage = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className=" md:col-span-7 p-2 md:py-5 mx-auto max-w-7xl w-full">
      {/* <NeetResultsBanner /> */}
      <Banner />
      {isLoading ? (
        <div className="flex items-center justify-center py-5">
          <Spinner />
          <span className="text-lg font-medium text-gray-800">
            Loading news...
          </span>
        </div>
      ) : (
        <Suspense>
          {data.pages[0].length ? (
            data.pages.map((item, i) =>
              item.map((data, index) => {
                return (
                  <NewsCard
                    key={data.blog_image}
                    firstIndex={i === 0 && index === 0}
                    data={data}
                  />
                );
              })
            )
          ) : (
            <p className="text-center py-8 font-semibold text-xl text-gray-600">
              Currently there is no news
            </p>
          )}
        </Suspense>
      )}
      {!isLoading && isFetching && (
        <div className="flex items-center justify-center py-2">
          <Spinner />
          <span className="text-lg font-medium text-gray-800">
            Loading more...
          </span>
        </div>
      )}
    </div>
  );
}
