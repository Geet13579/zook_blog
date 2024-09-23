'use client';

import { fetchSingleShort } from '@utils/queryFunctions';
import { useQuery } from 'react-query';
import Spinner from './LoadingSpinner';
import Link from 'next/link';

export default function HomeShorts() {
  const { data, isLoading } = useQuery(['homeShort'], fetchSingleShort);

  return (
    <div className="hidden sticky top-0 right-0 md:h-screen lg:col-span-3 lg:flex flex-col p-5">
      {isLoading ? (
        <div className="flex items-center justify-center py-2 h-[500px] bg-gray-200 rounded-xl overflow-hidden">
          <Spinner />
          <span className="text-lg font-medium text-gray-800">
            Loading short
          </span>
        </div>
      ) : (
        <Link
          href={'/shorts'}
          className="w-fit h-[500px] rounded-xl overflow-hidden relative cursor-pointer"
        >
          <span
            style={{
              position: 'absolute',
              height: '200px',
              width: '400px',
              top: '-100px',
              left: '-50px',
              borderRadius: '100px',
              background: 'rgba(0, 0, 0, 0.91)',
              filter: 'blur(35px)',
            }}
          />
          <div className="absolute top-0 left-0 w-full flex items-center justify-between text-white p-5">
            <button
              style={{
                background: 'linear-gradient(90deg, #E6000E 0%, #F92323 100%)',
              }}
              className="px-5 pt-2 pb-1 rounded font-bold text"
            >
              वीडियो
            </button>
            <button className="px-5 pt-2 pb-1 rounded-[80px] bg-[#343333] font-bold text">
              और देखे
            </button>
          </div>
          <span className="absolute z-40 flex items-center justify-center h-full text-white w-full fill-white">
            {playIcon}
          </span>
          <img
            src={data.thumbnail}
            alt="shorts thumbnail"
            className="object-cover h-full w-fit"
          />
        </Link>
      )}
      <p className="text-[#ADADAD] font-semibold text-xs leading-normal mt-5">
        Copyright © {new Date().getFullYear()} The Hit, All Rights Reserved
        {/* <span className="block mt-0.5">फीडबैक दें</span> */}
      </p>
      <div className="text-[#ADADAD] font-bold flex items-center gap-5 underline-offset-2 text-sm">
        <a href="mailto:yagnyawalky@gmail.com" className="hover:text-gray-500">
          yagnyawalky@gmail.com
        </a>
        <a href="tel:=918458900000" className="hover:text-gray-500">
          8458900000
        </a>
      </div>
      <div className="text-[#ADADAD] flex items-center gap-5 underline-offset-2 text-sm mt-3">
        <Link
          href={'/privacy-policy'}
          className="underline hover:text-gray-500"
        >
          Privacy Policy
        </Link>
        <Link
          href={'/terms-and-conditions'}
          className="underline hover:text-gray-500"
        >
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}

const playIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    className="h-16"
  >
    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
  </svg>
);
