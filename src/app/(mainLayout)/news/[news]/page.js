// // 'use server';

// import { fetchNewsById } from '@utils/queryFunctions';
// import Link from 'next/link';
// import NewsNavbar from './NewsNavbar';
// import ShareIcon from '@components/ShareIcon';
// import Image from 'next/image';
// import NewsPublishedTime from './NewsPublishedTime';

// export async function generateMetadata({ params }) {
//   const data = await fetchNewsById(params);

//   return {
//     title: data.name + ' | The Hit',
//     description: data.short_desc,
//     keywords: data.meta_keywords,
//     metadataBase: new URL('https://www.thehit.in/news/' + String(data.id)),
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         'max-video-preview': -1,
//         'max-image-preview': 'large',
//         'max-snippet': -1,
//       },
//     },
//     authors: [{ name: data.added_by }],
//     publisher: 'The Hit',
//     category: data.category,
//     openGraph: {
//       title: data.name + ' | The Hit',
//       description: data.short_desc,
//       url: new URL('https://www.thehit.in/news/' + String(data.id)),
//       siteName: 'www.thehit.in',
//       type: 'article',
//       publishedTime: new Date(data.createdon).toISOString(),
//       authors: [data.added_by],
//       images: [
//         {
//           url: data.image,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: data.name + ' | The Hit',
//       description: data.short_desc,
//       creator: '@thehit',
//       images: [data.image],
//       url: new URL('https://www.thehit.in/news/' + String(data.id)),
//     },
//   };
// }

// export default async function Page({ params }) {
//   const data = await fetchNewsById(params);

//   const jsonLd = {
//     '@context': 'http://schema.org',
//     '@type': 'NewsArticle',
//     mainEntityOfPage: {
//       '@type': 'WebPage',
//       '@id': new URL('https://www.thehit.in/news/' + String(data.id)),
//     },
//     headline: data.name,
//     datePublished: new Date(data.createdon).toISOString(),
//     dateModified: new Date(data.createdon).toISOString(),
//     author: {
//       '@type': 'Person',
//       name: data.added_by,
//     },
//     publisher: {
//       '@type': 'Organization',
//       name: 'The Hit',
//       logo: {
//         '@type': 'ImageObject',
//         url: 'https://www.thehit.in/logo.png',
//       },
//     },
//     description: data.short_desc,
//     image: {
//       '@type': 'ImageObject',
//       url: data.image,
//       width: 800,
//       height: 600,
//     },
//   };

//   return (
//     <>
//       <NewsNavbar data={data} />
//       <div className="md:col-span-9 lg:col-span-7 md:py-6 p-5 w-full mx-auto">
//         <div className="hidden md:flex mb-5 items-center justify-between text-gray-500">
//           <span>
//             <Link href={'/'} className="hover:underline underline-offset-2">
//               Home{' '}
//             </Link>{' '}
//             &gt;
//             <Link href={'/'} className="hover:underline underline-offset-2">
//               {' '}
//               News{' '}
//             </Link>
//             &gt; Details of news
//           </span>
//           <span>By: {data.added_by}</span>
//         </div>
//         <h1 className="text-lg font-bold text-[#4D4D4D] leading-relaxed">
//           {data.name}
//         </h1>
//         <h3 className="my-2 font-medium text-[#7d7d7d] leading-relaxed">
//           {data.short_desc}
//         </h3>
//         <div className="flex items-center justify-between text-[#ADADAD] my-2 w-full">
//           <span>{data.category}</span>
//           <ShareIcon
//             className="hidden md:block p-1 cursor-pointer"
//             data={data}
//           />
//           <span className="md:hidden">By: {data.added_by}</span>
//         </div>
//         <NewsPublishedTime data={data} />
//         <img
//           height={1000}
//           width={1000}
//           quality={80}
//           src={data.image}
//           alt={data.name}
//           className="mx-auto object-contain overflow-hidden rounded-lg w-full"
//         />
//         <div
//           className="my-5 text-[#A3A3A3] news-desc mb-32 md:last:mb-10 w-full overflow-hidden"
//           dangerouslySetInnerHTML={{ __html: data.description }}
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//       </div>
//     </>
//   );
// }
