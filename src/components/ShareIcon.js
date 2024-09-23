'use client';

import shareFn from '@utils/shareFn';
import linkIcon from '@assets/icons/news/link.svg';
import fbIcon from '@assets/icons/news/fb.svg';
import whatsappIcon from '@assets/icons/news/whatsapp.svg';
import twitterIcon from '@assets/icons/news/twitter.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ShareIcon({ className, data }) {
  const router = useRouter();

  if ('blogId' in data) {
    data.id = data.blogId;
    data.name = data.blogShortDesc;
  }

  const getShareLink = (e, platform) => {
    e.preventDefault();
    e.stopPropagation();

    const encodedTitle = encodeURIComponent(data.name + '\n\n');
    const encodedURL = encodeURIComponent(
      typeof window !== 'undefined' &&
        window.location.origin + '/news/' + data.id
    );

    if (platform === 'wa') {
      return `https://api.whatsapp.com/send/?text=${encodedTitle}${encodedURL}`;
    } else if (platform === 'tw') {
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`;
    } else if (platform === 'fb') {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&quote=${encodedTitle}`;
    }
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Image
        width={30}
        height={30}
        src={whatsappIcon.src}
        alt="whatsapp-share-icon"
        className={className}
        onClick={(e) => router.push(getShareLink(e, 'wa'))}
      />
      <Image
        width={30}
        height={30}
        src={fbIcon.src}
        alt="facebook-share-icon"
        className={className}
        onClick={(e) => router.push(getShareLink(e, 'fb'))}
      />
      <Image
        width={30}
        height={30}
        src={twitterIcon.src}
        alt="twitter-share-icon"
        className={className}
        onClick={(e) => router.push(getShareLink(e, 'tw'))}
      />
      <Image
        width={30}
        height={30}
        src={linkIcon.src}
        alt="share-icon"
        className={className}
        onClick={(e) => shareFn(e, data.id, data.name)}
      />
    </div>
  );
}
