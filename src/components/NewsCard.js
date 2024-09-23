import Link from 'next/link';
import ShareIcon from '@components/ShareIcon';
import Image from 'next/image';
import newsPublishedTime from '@utils/newsPublishedTimeFn';

export default function NewsCard({ data, firstIndex }) {
  const titleCharLength = 150;

  const createdTimeSection = (
    <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-[#ADADAD] text-sm font-semibold">
      <span className="">By {data.blog_added_by}</span>
      <span className="">{newsPublishedTime(data.blog_createdon)}</span>
    </div>
  );

  return (
    <Link
      href={`/news/${data.blog_id}`}
      className="py-5 px-4 rounded-md block hover:bg-gray-100 border-y last:border-b-0 last:mb-32 md:last:mb-10"
    >
      <div className={`flex ${firstIndex && 'flex-col'}`}>
        <div className="flex flex-col w-full">
          <h3
            className={`w-full font-semibold text-[15px] md:text-lg text-[#4D4D4D] leading-relaxed ${
              firstIndex && 'mb-3'
            }`}
          >
            {data.blog_name}
          </h3>
          <p className="hidden md:block w-full text-[14px]leading-relaxed text-[#7d7d7d] mt-2">
            {window.innerWidth <= 500 &&
            String(data.blog_short_desc).length >= titleCharLength
              ? data.blog_short_desc.substring(0, titleCharLength) + '...'
              : data.blog_short_desc}
          </p>
        </div>
        {firstIndex && createdTimeSection}
        <img
          height={firstIndex ? 1000 : 200}
          width={firstIndex ? 1000 : 200}
          src={data.blog_image}
          alt={data.blog_short_desc}
          className={`object-contain rounded-lg ${
            firstIndex ? 'my-3' : 'w-[7rem] md:w-[14rem] ml-2'
          }`}
        />
      </div>
      <p className="md:hidden w-full text-[14px] leading-relaxed text-[#7d7d7d] mt-2">
        {window.innerWidth <= 500 &&
        String(data.blog_short_desc).length >= titleCharLength
          ? data.blog_short_desc.substring(0, titleCharLength) + '...'
          : data.blog_short_desc}
      </p>
      <div className="my-3 flex items-center justify-between">
        <span className="text-[#ADADAD]">{data.blog_category}</span>
        <div className="flex items-center justify-between gap-3">
          {/* <a href="">
            <img src={whatsappIcon} alt="share in whatsapp" />
          </a>
          <a href="">
            <img src={fbIcon} alt="share in facebook" />
          </a> */}
          <ShareIcon
            className="p-1 cursor-pointer"
            data={{
              blogId: data.blog_id,
              blogShortDesc: data.blog_short_desc,
            }}
          />
        </div>
      </div>
      {!firstIndex && createdTimeSection}
    </Link>
  );
}
