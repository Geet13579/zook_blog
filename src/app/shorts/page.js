'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactPlayer from 'react-player/youtube';
import { useDispatch } from 'react-redux';
import { setFloatingBtn } from '@redux/store';
import { fetchShorts, totalItemsPerPage } from '@utils/queryFunctions';
import { useInfiniteQuery } from 'react-query';
import Spinner from '@components/LoadingSpinner';

export default function Shorts() {
  const dispatch = useDispatch();
  const [videoUrls, setVideoUrls] = useState([]);

  const { fetchNextPage, isLoading } = useInfiniteQuery(
    'shorts',
    ({ pageParam = 0 }) => fetchShorts(pageParam),
    {
      onSuccess: (data) => {
        setVideoUrls([...new Set([...videoUrls, ...data.pages.flat()])]);
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === totalItemsPerPage) {
          return allPages.length;
        } else if (lastPage.length < totalItemsPerPage) {
          return undefined;
        }
      },
    }
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const [variants, setVariants] = useState({
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  });

  const handleNext = () => {
    if (currentIndex >= videoUrls.length - 3) {
      fetchNextPage();
    }

    setVariants({
      ...variants,
      initial: { y: '100vh', opacity: 0 },
      exit: { y: '-100vh', opacity: 0 },
    });

    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  const handlePrev = () => {
    setVariants({
      ...variants,
      initial: { y: '-100vh', opacity: 0 },
      exit: { y: '100vh', opacity: 0 },
    });
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoUrls.length - 1 : prevIndex - 1
    );
  };

  const [initialYAxis, setInitialYAxis] = useState(0);

  const handleDragStart = (event, info) => {
    setInitialYAxis(info.point.y);
  };

  const handleDragEnd = (event, info) => {
    const { point } = info;

    const totalDistance = initialYAxis - point.y;

    if (totalDistance > 200) {
      handleNext();
    }

    if (totalDistance < -200) {
      handlePrev();
    }
  };

  return (
    <div className="bg-black fixed md:static top-0 left-0 md:bg-gray-50 md:flex items-center justify-center gap-8 h-screen md:py-10 z-50 w-full md:w-[80vw]">
      <button
        onClick={handlePrev}
        className="hidden bg-gray-300 h-14 w-14 rounded-full md:flex items-center justify-center p-5 fill-gray-800 hover:ring-4 ring-black/30 rotate-180"
      >
        {icons.next}
      </button>
      <div className="w-full md:w-fit h-screen flex flex-col justify-center">
        <AnimatePresence mode="popLayout" initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full md:w-fit h-screen md:h-auto md:min-h-[530px] rounded-xl overflow-hidden"
          >
            {isLoading ? (
              <div className="flex h-full items-center justify-center flex-grow py-2">
                <Spinner />
              </div>
            ) : (
              <>
                <span
                  onClick={() => setPlaying(!playing)}
                  className="md:hidden absolute top-[18%] bottom-[16%] h-auto w-full"
                />
                <ReactPlayer
                  url={videoUrls[currentIndex]}
                  width="100%"
                  height="100%"
                  playing={playing}
                  loop
                  controls
                  onPlay={() => dispatch(setFloatingBtn(false))}
                  onPause={() => dispatch(setFloatingBtn(true))}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={handleNext}
        className="hidden bg-gray-300 h-14 w-14 rounded-full md:flex items-center justify-center p-5 fill-gray-800 hover:ring-4 ring-black/30"
      >
        {icons.next}
      </button>
    </div>
  );
}

const icons = {
  next: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // height="1em"
      viewBox="0 0 384 512"
    >
      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
    </svg>
  ),
};
