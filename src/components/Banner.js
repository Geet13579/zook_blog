'use client';

import { useQuery } from 'react-query';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { fetchBanners } from '@utils/queryFunctions';
import Spinner from '@components/LoadingSpinner';

export default function Banner() {
  const { data, isLoading } = useQuery('banner', fetchBanners);

  return (
    <div className="flex items-center justify-center px-2">
      {isLoading ? (
        <>
          <Spinner />
          <span className="text-lg font-medium text-gray-800">
            Loading news
          </span>
        </>
      ) : (
        <Carousel
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={3000}
          transitionTime={600}
          swipeScrollTolerance={50}
          preventMovementUntilSwipeScrollTolerance={true}
          showIndicators={false}
          // className="px-2 max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto"
          className="w-full h-full rounded-lg overflow-hidden"
        >
          {data.map((item) => {
            return (
              <a
                key={item.ban_id}
                target="_blank"
                href={item.ban_link}
                style={{
                  backgroundImage: `url(${item.ban_image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                // className="block px-6 h-40 rounded-lg overflow-hidden"
                className="block h-40 w-full"
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
