'use client';
import React, { useEffect, useState } from 'react';
import ImageValue from '../assets/icons/independence2024.jpeg';
import Image from 'next/image';
const CustomPopup = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const val = localStorage.getItem('2024IndependencePopup');
    setValue(val);
  }, []);
  console.log('value is:', value);
  const closeButton = () => {
    localStorage.setItem('2024IndependencePopup', 'true');
    setValue('true');
  };
  if (value === 'true') {
    return null;
  }
  return (
    <div className="fixed bg-black bg-opacity-80 top-0 bottom-0 right-0 left-0 z-50">
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
        <Image src={ImageValue} className="w-80 h-80" alt="Image" />
        <button
          className="bg-blue-500 px-6 py-1 rounded-full"
          onClick={closeButton}
        >
          <p className="text-white">Close</p>
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
