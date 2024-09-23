'use client';

import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';

import homeIcon from '@assets/icons/floating-btn/home.png';
import shortsIcon from '@assets/icons/floating-btn/shorts.png';
import { useEffect } from 'react';
import Link from 'next/link';

export default function FloatingActionBtn() {
  const floatingBtn = useSelector((state) => state.floatingBtn.floatingBtn);
  const controls = useAnimation();

  const fadeInOutVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    if (floatingBtn) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [floatingBtn, controls]);

  return (
    <motion.div
      className="fixed bottom-10 w-full lg:hidden"
      initial="hidden"
      animate={controls}
      variants={fadeInOutVariants}
    >
      <div
        style={{
          boxShadow: '0px 4px 114px 0px rgba(0, 0, 0, 0.14)',
          backdropFilter: 'blur(2px)',
        }}
        className="border rounded-[80px] border-[#EAEAEA] bg-white flex items-center py-3 px-8 w-fit mx-auto"
      >
        <Link
          href={'/'}
          className="flex items-center gap-3 border-r-2 border-[#0000001A] pr-5"
        >
          <img
            src={homeIcon.src}
            alt="home icon"
            className="h-6 w-6 object-contain"
          />
          <p>होम</p>
        </Link>
        <Link href={'/shorts'} className="flex items-center gap-3 pl-5">
          <img
            src={shortsIcon.src}
            alt="short icon"
            className="h-6 w-6 object-contain"
          />
          <p>शॉर्ट्स</p>
        </Link>
      </div>
    </motion.div>
  );
}
